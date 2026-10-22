// src/app/suisse/page.tsx
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Compass,
  Award,
  ShieldCheck,
  BookOpen,
  ExternalLink,
  ArrowRight,
  Play,
  CheckCircle2,
  ChevronRight,
  Search,
  Building2,
  Layers,
  Clock,
  Zap,
  RotateCcw,
  FileText,
  Globe,
  MapPin,
  Info
} from 'lucide-react';

// --- DATA STRUCTURES ---
interface RegionData {
  id: string;
  name: string;
  cantons: string;
  cities: string[];
  description: string;
  specialty: string;
  cx: number; // SVG Map pin coordinates
  cy: number;
  areaPath: string; // SVG path approximate region
  manufactures: {
    name: string;
    city: string;
    foundation: number;
    hallmark: string;
  }[];
  institutions: {
    name: string;
    type: 'musée' | 'école' | 'fondation';
    city: string;
    link: string;
  }[];
}

const SWISS_REGIONS: RegionData[] = [
  {
    id: 'geneve',
    name: 'Genève & Bassin Lémanique',
    cantons: 'Canton de Genève (GE)',
    cities: ['Genève', 'Plan-les-Ouates', 'Meyrin'],
    description: 'Le berceau originel de l\'horlogerie suisse depuis 1541. Après la Réforme calviniste interdisant le port d\'objets précieux, les orfèvres et joailliers genevois s\'allièrent aux réfugiés huguenots français pour inventer les premiers chefs-d\'œuvre mécaniques de poche.',
    specialty: 'Très Grandes Complications, Poinçon de Genève, Métiers d\'Art & Joaillerie',
    cx: 90,
    cy: 390,
    areaPath: 'M 60,370 L 110,360 L 120,410 L 80,430 Z',
    manufactures: [
      { name: 'Patek Philippe', city: 'Plan-les-Ouates', foundation: 1839, hallmark: 'Poinçon Patek Philippe' },
      { name: 'Rolex (Siège & Boîtiers)', city: 'Genève - Les Acacias', foundation: 1905, hallmark: 'Chronomètre Superlatif' },
      { name: 'Vacheron Constantin', city: 'Plan-les-Ouates', foundation: 1755, hallmark: 'Poinçon de Genève' },
      { name: 'Chopard', city: 'Meyrin', foundation: 1860, hallmark: 'Poinçon de Genève / Fleurier' },
      { name: 'F.P. Journe', city: 'Genève - Plainpalais', foundation: 1999, hallmark: 'Invenit et Fecit' },
      { name: 'Roger Dubuis', city: 'Meyrin', foundation: 1995, hallmark: 'Poinçon de Genève 100%' }
    ],
    institutions: [
      { name: 'Patek Philippe Museum', type: 'musée', city: 'Genève', link: 'https://www.patekmuseum.com' },
      { name: 'Fondation de la Haute Horlogerie (FHH)', type: 'fondation', city: 'Genève', link: 'https://www.hautehorlogerie.org' },
      { name: 'École d\'Horlogerie de Genève (CFPT)', type: 'école', city: 'Petit-Lancy', link: 'https://www.ge.ch/ecole-horlogerie-geneve' },
      { name: 'Musée d\'Art et d\'Histoire (MAH)', type: 'musée', city: 'Genève', link: 'https://www.artindustriel.ch' }
    ]
  },
  {
    id: 'vallee-de-joux',
    name: 'Vallée de Joux',
    cantons: 'Canton de Vaud (VD)',
    cities: ['Le Brassus', 'Le Sentier', 'L\'Orient', 'Les Bioux'],
    description: 'Une vallée d\'altitude jurassienne mythique aux hivers rigoureux, où les paysans-horlogers développèrent dans leurs fermes isolées les mécanismes les plus complexes au monde. C\'est le royaume incontesté des sonneries, répétitions minutes, tourbillons et équations du temps.',
    specialty: 'Grandes Sonneries, Répétitions Minutes, Tourbillons & Finitions Main',
    cx: 140,
    cy: 310,
    areaPath: 'M 115,290 L 165,280 L 175,340 L 125,345 Z',
    manufactures: [
      { name: 'Audemars Piguet', city: 'Le Brassus', foundation: 1875, hallmark: 'Haute Horlogerie Suisse' },
      { name: 'Jaeger-LeCoultre', city: 'Le Sentier', foundation: 1833, hallmark: 'La Grande Maison - 1200+ Calibres' },
      { name: 'Blancpain', city: 'Le Brassus', foundation: 1735, hallmark: 'Doyen des Maisons Horlogères' },
      { name: 'Breguet', city: 'L\'Orient', foundation: 1775, hallmark: 'Inventeur du Tourbillon' },
      { name: 'Philippe Dufour', city: 'Le Sentier', foundation: 1989, hallmark: 'Maître Indépendant Simplicity' }
    ],
    institutions: [
      { name: 'École Technique de la Vallée de Joux (ETVJ)', type: 'école', city: 'Le Sentier', link: 'https://www.etvj.ch' },
      { name: 'Espace Horloger de la Vallée de Joux', type: 'musée', city: 'Le Sentier', link: 'https://www.espacehorloger.ch' },
      { name: 'Musée Atelier Audemars Piguet', type: 'musée', city: 'Le Brassus', link: 'https://www.audemarspiguet.com/com/fr/about/musee-atelier.html' }
    ]
  },
  {
    id: 'neuchatel',
    name: 'Neuchâtel, Le Locle & La Chaux-de-Fonds',
    cantons: 'Canton de Neuchâtel (NE)',
    cities: ['La Chaux-de-Fonds', 'Le Locle', 'Neuchâtel', 'Fleurier'],
    description: 'Classé au Patrimoine Mondial de l\'UNESCO pour son urbanisme horloger unique conçu au XIXe siècle pour la lumière des ateliers. C\'est la capitale de la précision chronométrique, des observatoires et de l\'industrialisation des calibres suisses.',
    specialty: 'Chronométrie d\'Observatoire, Chronographes & Urbanisme UNESCO',
    cx: 210,
    cy: 220,
    areaPath: 'M 180,180 L 250,185 L 240,260 L 170,250 Z',
    manufactures: [
      { name: 'Zenith', city: 'Le Locle', foundation: 1865, hallmark: 'El Primero - Premier Calibre Automatique 36\'000 A/h' },
      { name: 'Girard-Perregaux', city: 'La Chaux-de-Fonds', foundation: 1791, hallmark: 'Tourbillon sous Trois Ponts d\'Or' },
      { name: 'Ulysse Nardin', city: 'Le Locle', foundation: 1846, hallmark: 'Chronomètres de Marine & Silicium Freak' },
      { name: 'Tissot', city: 'Le Locle', foundation: 1853, hallmark: 'Innovateurs par Tradition' },
      { name: 'Parmigiani Fleurier', city: 'Fleurier', foundation: 1996, hallmark: 'Qualité Fleurier & Restauration' },
      { name: 'Cartier (Manufacture)', city: 'La Chaux-de-Fonds', foundation: 1847, hallmark: 'Haute Horlogerie & Formes' }
    ],
    institutions: [
      { name: 'Musée International d\'Horlogerie (MIH)', type: 'musée', city: 'La Chaux-de-Fonds', link: 'https://www.chaux-de-fonds.ch/musees/mih' },
      { name: 'Musée d\'Horlogerie du Locle (Château des Monts)', type: 'musée', city: 'Le Locle', link: 'https://www.mhl-lelocle.ch' },
      { name: 'CIFOM - Pôle Horlogerie CPNE', type: 'école', city: 'Le Locle', link: 'https://www.cpne.ch' },
      { name: 'HE-Arc Ingénierie & Microtechnique', type: 'école', city: 'Neuchâtel', link: 'https://www.he-arc.ch' }
    ]
  },
  {
    id: 'bienne-jura',
    name: 'Bienne, Jura Bernois & Soleure',
    cantons: 'Cantons de Berne (BE), Jura (JU) & Soleure (SO)',
    cities: ['Bienne', 'Saint-Imier', 'Granges (Grenchen)', 'Porrentruy'],
    description: 'Le cœur battant de la production industrielle suisse et de l\'innovation technique. C\'est ici que sont fabriqués les moteurs horlogers les plus fiables de la planète et les plus grandes légendes chronométriques de l\'espace et des profondeurs océaniques.',
    specialty: 'Moteurs Mécaniques, Chronométrie Master Chronometer & Industrialisation',
    cx: 290,
    cy: 170,
    areaPath: 'M 250,130 L 330,135 L 340,210 L 260,215 Z',
    manufactures: [
      { name: 'Omega', city: 'Bienne', foundation: 1848, hallmark: 'Speedmaster Moonwatch & Co-Axial' },
      { name: 'Rolex (Manufacture des Mouvements)', city: 'Bienne', foundation: 1905, hallmark: 'Calibres Manufacture 3135/3235/4130' },
      { name: 'Longines', city: 'Saint-Imier', foundation: 1832, hallmark: 'Élégance & Sablier Ailé (Brevet 1889)' },
      { name: 'Breitling', city: 'Granges (Grenchen)', foundation: 1884, hallmark: 'Chronographes d\'Aviation Navitimer' },
      { name: 'ETA SA Manufacture Horlogère', city: 'Granges (Grenchen)', foundation: 1793, hallmark: 'Piliers ETA 2824-2 & 6497-1' }
    ],
    institutions: [
      { name: 'Cité du Temps (Musées Omega & Swatch)', type: 'musée', city: 'Bienne', link: 'https://www.citedutemps.com' },
      { name: 'Musée Longines', type: 'musée', city: 'Saint-Imier', link: 'https://www.longines.com/fr-ch/univers/musee' },
      { name: 'École Technique de Porrentruy', type: 'école', city: 'Porrentruy', link: 'https://www.jura.ch' }
    ]
  },
  {
    id: 'schaffhouse',
    name: 'Schaffhouse & Suisse Alémanique',
    cantons: 'Canton de Schaffhouse (SH)',
    cities: ['Schaffhausen', 'Neuhausen am Rheinfall'],
    description: 'Fondée au bord des chutes du Rhin par l\'ingénieur et horloger américain Florentine Ariosto Jones en 1868, pour allier l\'énergie hydroélectrique du fleuve et le savoir-faire des artisans suisses. Un bastion de la rigueur d\'ingénierie.',
    specialty: 'Montres d\'Aviation, Calendriers Perpétuels Autonomes & Pellaton',
    cx: 430,
    cy: 80,
    areaPath: 'M 400,60 L 460,65 L 450,120 L 390,110 Z',
    manufactures: [
      { name: 'IWC Schaffhausen', city: 'Schaffhausen', foundation: 1868, hallmark: 'Probus Scafusia - Rigueur d\'Ingénieurs' },
      { name: 'H. Moser & Cie', city: 'Neuhausen am Rheinfall', foundation: 1828, hallmark: 'Épure, Spiraux Straumann & Haute Horlogerie' }
    ],
    institutions: [
      { name: 'Musée IWC', type: 'musée', city: 'Schaffhausen', link: 'https://www.iwc.com/fr/fr/company/museum.html' },
      { name: 'Chutes du Rhin & Énergie Historique', type: 'musée', city: 'Neuhausen', link: 'https://www.rhinefalls.ch' }
    ]
  }
];

// Swiss Knowledge Quiz Questions (5 questions)
const SWISS_QUIZ = [
  {
    id: 1,
    question: 'Quelle circonstance historique a déclenché l\'essor de l\'horlogerie à Genève au XVIe siècle ?',
    options: [
      'L\'interdiction des bijoux par la Réforme de Calvin (1541), poussant les orfèvres vers l\'horlogerie',
      'La construction de la première ligne de chemin de fer alpine',
      'Un décret royal de Louis XIV demandant des chronomètres de marine',
      'La découverte des premières mines de rubis dans le Jura'
    ],
    correct: 0,
    explanation: 'En 1541, Jean Calvin bannit le port de parures et de bijoux religieux à Genève. Pour survivre, les talentueux orfèvres et émailleurs genevois unirent leurs forces aux réfugiés huguenots français pour fabriquer des montres de poche, considérées comme des instruments scientifiques utiles et licites.'
  },
  {
    id: 2,
    question: 'Quelle est la spécialité historique mondialement reconnue de la Vallée de Joux (Vaud) ?',
    options: [
      'Les Grandes Complications acoustiques (Répétitions Minutes, Grandes Sonneries) et tourbillons',
      'La fabrication exclusive de réveils de voyage en plastique',
      'L\'invention des montres solaires à quartz',
      'Le façonnage des verres acryliques bombés'
    ],
    correct: 0,
    explanation: 'La Vallée de Joux est le sanctuaire des très grandes complications mécaniques : sonneries au passage, répétitions à quarts et à minutes, quantièmes perpétuels et tourbillons. Des manufactures comme Audemars Piguet, Jaeger-LeCoultre et Blancpain y perpétuent cette suprématie séculaire.'
  },
  {
    id: 3,
    question: 'Quel critère légal fondamental définit le prestigieux label « Swiss Made » depuis l\'ordonnance de 2017 ?',
    options: [
      'Au moins 60% du coût de revient de la montre doit être généré en Suisse et le développement technique doit y être effectué',
      '100% de l\'or et des aciers doivent provenir de mines alpines suisses',
      'La montre doit obligatoirement avoir été portée au sommet du Cervin',
      'Toutes les vis doivent être taillées à la main sans aucune machine'
    ],
    correct: 0,
    explanation: 'La loi « Swissness » de la Fédération Horlogère Suisse (FH) stipule qu\'au minimum 60% de la valeur de fabrication de la montre doit être généré en Suisse, que le mouvement doit être suisse (60% valeur mini, emboîté et contrôlé en Suisse), et que le développement technique doit avoir lieu sur le territoire helvétique.'
  },
  {
    id: 4,
    question: 'Pourquoi les villes horlogères de La Chaux-de-Fonds et du Locle sont-elles inscrites au Patrimoine Mondial de l\'UNESCO ?',
    options: [
      'Pour leur urbanisme horloger unique, avec des rues parallèles conçues pour maximiser la lumière naturelle dans les ateliers',
      'Pour avoir abrité la plus grande forge de fer d\'Europe',
      'Parce que Napoléon Bonaparte y a signé le traité du temps',
      'En raison du record de la plus haute tour horlogère médiévale'
    ],
    correct: 0,
    explanation: 'Reconstruites après de grands incendies au XIXe siècle, La Chaux-de-Fonds et Le Locle ont été dessinées en damier selon les besoins vitaux des horlogers : façades orientées pour capter la lumière du jour, fenêtres hautes d\'ateliers sous les combes et symbiose parfaite entre habitat et manufacture.'
  },
  {
    id: 5,
    question: 'Qu\'est-ce que l\'AFP (Attestation fédérale de formation professionnelle) dans le système éducatif suisse ?',
    options: [
      'Une formation professionnelle initiale de 2 ans axée sur la pratique d\'atelier, reconnue par la Confédération suisse',
      'Un brevet d\'invention payant délivré par les banques privées',
      'Une taxe douanière prélevée sur les exportations d\'or',
      'Un club privé de collectionneurs de chronomètres de marine'
    ],
    correct: 0,
    explanation: 'L\'AFP (Opérateur en horlogerie) est un diplôme d\'État suisse officiel de 2 ans, fondé sur l\'apprentissage en manufacture sous contrat, et supervisé par la Convention Patronale (CP). Il constitue un tremplin direct vers le CFC (Horloger praticien 3 ans ou Horloger complet 4 ans).'
  }
];

export default function SuissePage() {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('geneve');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);

  // Active region
  const activeRegion = useMemo(() => {
    return SWISS_REGIONS.find(r => r.id === selectedRegionId) || SWISS_REGIONS[0];
  }, [selectedRegionId]);

  // Quiz score
  const quizScore = useMemo(() => {
    let score = 0;
    SWISS_QUIZ.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) score++;
    });
    return score;
  }, [selectedAnswers]);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#07090E] text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-amber-500/30 selection:text-amber-700 dark:selection:text-amber-200">
      
      {/* Background Subtle Radial Glows (dark mode atmospheric depth) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 hidden dark:block">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-amber-500/10 via-amber-700/5 to-transparent blur-[140px]" />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-red-600/5 blur-[160px]" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 relative z-10 space-y-16">

        {/* --- BREADCRUMB & SWISS EXCELLENCE BADGE --- */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">HorloLearn</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
            <span className="text-amber-600 dark:text-amber-300 font-medium">Horlogerie Suisse</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
            <span className="text-slate-700 dark:text-slate-300">Cantons & Manufactures</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-red-50 text-red-800 border border-red-200 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/30">
              <span className="w-2 h-2 rounded-full bg-red-600 dark:bg-red-400 animate-pulse" />
              🇨🇭 Confédération Suisse · Excellence FH
            </span>
          </div>
        </div>

        {/* --- HERO HEADER --- */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-mono tracking-widest uppercase shadow-sm">
            <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            Patrimoine Mondial & Savoir-Faire d&apos;Exception
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            L&apos;Horlogerie Suisse & <br />
            <span className="bg-gradient-to-r from-red-600 via-amber-500 to-amber-600 dark:from-red-400 dark:via-amber-300 dark:to-amber-500 bg-clip-text text-transparent">
              ses Cantons d&apos;Élite
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Des ateliers des maîtres cabinotiers genevois aux combes secrètes de la Vallée de Joux,
            du damier UNESCO des montagnes neuchâteloises aux pôles industriels de Bienne et de Schaffhouse.
            Explorez la cartographie vivante de l&apos;excellence horlogère helvétique.
          </p>

          {/* 4 Piliers Chiffrés de l'Industrie Suisse */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-left pt-4 font-mono">
            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
              <div className="text-xs text-slate-500 dark:text-slate-400">Pôles Phares</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">5 Bassins</div>
              <div className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5">Arc Jurassien & Genève</div>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
              <div className="text-xs text-slate-500 dark:text-slate-400">Exportations Annuelles</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">~26 Mrd CHF</div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">Fédération Horlogère (FH)</div>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
              <div className="text-xs text-slate-500 dark:text-slate-400">Norme Swissness</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">60% Mini</div>
              <div className="text-[11px] text-red-600 dark:text-red-400 mt-0.5">Valeur & Emboîtage Suisse</div>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
              <div className="text-xs text-slate-500 dark:text-slate-400">Patrimoine Mondial</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">UNESCO</div>
              <div className="text-[11px] text-sky-600 dark:text-sky-400 mt-0.5">La Chaux-de-Fonds & Le Locle</div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: LA CARTE INTERACTIVE VECTORIELLE DE LA SUISSE HORLOGÈRE      */}
        {/* ========================================================================= */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                🗺️ Cartographie & Géographie de Manufacture
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                La Carte Interactive de la Suisse Horlogère
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Cliquez sur un bassin pour révéler ses manufactures et institutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* CARTE SVG INTERACTIVE (7 cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8 shadow-md dark:shadow-[0_6px_24px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center relative">
              <div className="w-full flex items-center justify-between mb-4 font-mono text-xs">
                <span className="text-slate-500 dark:text-slate-400">Arc Jurassien, Léman & Rhin</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">Bassin Actif : {activeRegion.name}</span>
              </div>

              {/* CARTE SVG VECTORIELLE SUISSE */}
              <div className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-[#070B14] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-inner flex items-center justify-center p-2 select-none">
                <svg viewBox="0 0 520 440" className="w-full h-full drop-shadow-md">
                  <defs>
                    <radialGradient id="regionHighlight" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* 1. Contour stylisé de la Suisse */}
                  <path
                    d="M 60,380 L 100,340 L 120,300 L 170,260 L 210,180 L 260,140 L 320,110 L 400,60 L 450,70 L 480,110 L 460,180 L 480,240 L 450,300 L 400,340 L 350,360 L 300,350 L 260,380 L 210,390 L 160,370 L 110,420 L 70,420 Z"
                    fill="none"
                    stroke="#CBD5E1"
                    strokeWidth="1.5"
                    className="dark:stroke-slate-700"
                  />

                  {/* 2. Lacs Majeurs Suisses (Repères géographiques authentiques) */}
                  {/* Lac Léman (Lake Geneva) */}
                  <path
                    d="M 65,395 Q 100,365 140,360 Q 110,380 65,395 Z"
                    fill="#38BDF8"
                    fillOpacity="0.6"
                    stroke="#0284C7"
                    strokeWidth="0.8"
                  />
                  {/* Lac de Neuchâtel */}
                  <path
                    d="M 180,240 Q 210,210 240,195 Q 220,225 180,240 Z"
                    fill="#38BDF8"
                    fillOpacity="0.5"
                    stroke="#0284C7"
                    strokeWidth="0.8"
                  />
                  {/* Lac de Bienne */}
                  <ellipse cx="255" cy="180" rx="12" ry="5" fill="#38BDF8" fillOpacity="0.5" stroke="#0284C7" strokeWidth="0.6" transform="rotate(-35, 255, 180)" />
                  {/* Lac de Constance (Bodensee) */}
                  <path
                    d="M 440,70 Q 480,90 500,105 Q 470,100 440,70 Z"
                    fill="#38BDF8"
                    fillOpacity="0.5"
                    stroke="#0284C7"
                    strokeWidth="0.8"
                  />

                  {/* 3. Régions & Nœuds Clés */}
                  {SWISS_REGIONS.map((reg) => {
                    const isSelected = reg.id === activeRegion.id;

                    return (
                      <g key={reg.id} className="cursor-pointer group" onClick={() => setSelectedRegionId(reg.id)}>
                        {/* Zone polygonale douce */}
                        <path
                          d={reg.areaPath}
                          fill={isSelected ? '#F59E0B' : '#E2E8F0'}
                          fillOpacity={isSelected ? 0.25 : 0.08}
                          stroke={isSelected ? '#F59E0B' : '#94A3B8'}
                          strokeWidth={isSelected ? 2 : 1}
                          strokeDasharray={isSelected ? 'none' : '3,3'}
                          className="transition-all duration-300"
                        />

                        {/* Halo pulsant si sélectionné */}
                        {isSelected && (
                          <circle cx={reg.cx} cy={reg.cy} r="22" fill="url(#regionHighlight)" className="animate-pulse" />
                        )}

                        {/* Pin de région */}
                        <circle
                          cx={reg.cx}
                          cy={reg.cy}
                          r={isSelected ? 9 : 6.5}
                          fill={isSelected ? '#F59E0B' : '#DC2626'}
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          className="transition-transform group-hover:scale-125 drop-shadow-md"
                        />
                        <circle cx={reg.cx} cy={reg.cy} r={isSelected ? 3.5 : 2.5} fill="#FFFFFF" />

                        {/* Étiquette Nom */}
                        <text
                          x={reg.cx}
                          y={reg.cy - 14}
                          textAnchor="middle"
                          fill={isSelected ? '#D97706' : '#475569'}
                          fontSize={isSelected ? '11' : '9'}
                          fontFamily="ui-sans-serif, system-ui, sans-serif"
                          fontWeight={isSelected ? 'bold' : '600'}
                          className="dark:fill-slate-200 transition-colors pointer-events-none drop-shadow-sm"
                        >
                          {reg.name.split('&')[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Boutons Sélecteurs Rapides des 5 Régions */}
              <div className="w-full mt-6 flex flex-wrap items-center justify-center gap-2">
                {SWISS_REGIONS.map((r) => {
                  const isSelected = r.id === activeRegion.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRegionId(r.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {r.name.split('&')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FICHE DÉTAILLÉE DU BASSIN ACTIF (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-amber-500/40 rounded-2xl p-6 shadow-md dark:shadow-[0_6px_24px_rgba(0,0,0,0.5)] space-y-5">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      {activeRegion.cantons}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300 border border-red-200 dark:border-red-500/30">
                      Haut Lieu Horloger
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                    {activeRegion.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {activeRegion.cities.map((city) => (
                      <span key={city} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        📍 {city}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  {activeRegion.description}
                </p>

                <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 text-xs">
                  <span className="font-bold text-amber-800 dark:text-amber-300 font-mono">Spécialité d&apos;Établi : </span>
                  <span className="text-slate-700 dark:text-slate-300">{activeRegion.specialty}</span>
                </div>

                {/* Manufactures Phares de la Région */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span className="font-bold uppercase">Grandes Manufactures</span>
                    <span>Fondation</span>
                  </div>
                  <div className="space-y-2">
                    {activeRegion.manufactures.map((m) => (
                      <div
                        key={m.name}
                        className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-serif font-bold text-slate-900 dark:text-white">{m.name}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">{m.city} · {m.hallmark}</div>
                        </div>
                        <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{m.foundation}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Musées & Écoles */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-mono font-bold uppercase text-slate-500 dark:text-slate-400">Institutions & Musées</span>
                  <div className="space-y-1.5">
                    {activeRegion.institutions.map((inst) => (
                      <a
                        key={inst.name}
                        href={inst.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-300 border border-slate-200 dark:border-slate-800 transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{inst.type === 'musée' ? '🏛️' : inst.type === 'école' ? '🎓' : '🏛️'}</span>
                          <span>{inst.name}</span>
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: MÉDIATHÈQUE & FLIPBOOKS OFFICIELS (/suisse/metiers-horlogerie)   */}
        {/* ========================================================================= */}
        <section className="space-y-6 pt-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              📚 Publications & Rapports d&apos;Établi
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
              Médiathèque & Guides Officiels Suisses
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Guide Métiers FlipBook Link */}
            <Link
              href="/suisse/metiers-horlogerie"
              className="p-8 rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-400 shadow-md dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30">
                      FlipBook Interactif
                    </span>
                    <span className="text-xs font-mono text-slate-400">Convention Patronale</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                    Guide des Métiers de l&apos;Horlogerie
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    Explorez le feuilleteur interactif complet des professions de l&apos;industrie suisse : horlogers praticiens, polisseurs, micromécaniciens et maîtres du rhabillage.
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                <span>Feuilleter le guide interactif</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>

            {/* Rapport FHH 2024 FlipBook Link */}
            <Link
              href="/suisse/rapport-fhh"
              className="p-8 rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-400 shadow-md dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/30">
                      Rapport d&apos;Étude 2024
                    </span>
                    <span className="text-xs font-mono text-slate-400">FHH Genève</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                    Rapport Annuel Fondation Haute Horlogerie
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    Chiffres clés de l&apos;industrie, évolution des exportations mondiales de garde-temps suisses et grandes tendances mécaniques et durables du secteur.
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                <span>Ouvrir le rapport officiel FHH</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: ATTESTATION FÉDÉRALE AFP & FORMATION PROFESSIONNELLE SUISSE   */}
        {/* ========================================================================= */}
        <section className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 rounded-3xl p-8 sm:p-12 shadow-md dark:shadow-[0_6px_24px_rgba(0,0,0,0.5)] space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
              🇨🇭 Filières Reconnues par la Confédération Suisse
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white">
              L&apos;Attestation Fédérale de Formation Professionnelle (AFP)
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              L&apos;AFP en horlogerie est une formation professionnelle initiale suisse de 2 ans,
              centrée sur l&apos;apprentissage du geste d&apos;établi, l&apos;assemblage rigoureux de mouvements mécaniques et la microtechnique.
              Elle est encadrée par la Convention Patronale de l&apos;Industrie Horlogère Suisse (CP).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400">2 Ans</span>
              <h4 className="text-base font-serif font-bold text-slate-900 dark:text-white">Formation Pratique en Atelier</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Apprentissage en manufacture horlogère avec cours théoriques en école professionnelle (1 jour par semaine).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">Tremplin</span>
              <h4 className="text-base font-serif font-bold text-slate-900 dark:text-white">Passerelle vers le CFC</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Permet d&apos;accéder directement au Certificat Fédéral de Capacité (CFC Horloger praticien ou Horloger complet).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-2xl font-bold font-mono text-sky-600 dark:text-sky-400">SEFRI</span>
              <h4 className="text-base font-serif font-bold text-slate-900 dark:text-white">Titre Fédéral Suisse</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Diplôme reconnu par l&apos;ensemble des manufactures suisses et le Secrétariat d&apos;État à la formation (SEFRI).
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800 font-mono text-xs">
            <span className="text-slate-500">Pour déposer un dossier d&apos;apprentissage ou consulter les places vacantes :</span>
            <a
              href="https://www.orientation.ch/dyn/show/2101"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-colors inline-flex items-center gap-2 shadow-md shadow-red-600/20"
            >
              <span>Consulter Orientation.ch (Portail Officiel Suisse)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: CITATIONS DES MAÎTRES & VIDÉOTHÈQUE D'EXCELLENCE              */}
        {/* ========================================================================= */}
        <section className="space-y-6 pt-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              ⚡ Paroles de Maîtres & Savoir-Faire
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
              La Philosophie Horlogère Suisse
            </h2>
          </div>

          {/* Citations des Pères Fondateurs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)] flex flex-col justify-between space-y-4">
              <p className="text-sm font-serif italic text-slate-700 dark:text-slate-300 leading-relaxed">
                « Le temps ne se mesure pas, il se façonne avec passion et rigueur mathématique. »
              </p>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                Abraham-Louis Breguet (1747-1823)
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)] flex flex-col justify-between space-y-4">
              <p className="text-sm font-serif italic text-slate-700 dark:text-slate-300 leading-relaxed">
                « Fabriquer les montres les plus belles et les plus précises du monde, sans jamais faire de compromis sur la bienfacture. »
              </p>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                Antoine Norbert de Patek (1812-1877)
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)] flex flex-col justify-between space-y-4">
              <p className="text-sm font-serif italic text-slate-700 dark:text-slate-300 leading-relaxed">
                « Une montre mécanique est une merveille vivante qui doit défier les siècles et les éléments les plus extrêmes. »
              </p>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                Hans Wilsdorf (1881-1960)
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: QUIZ DU PATRIMOINE HORLOGER SUISSE                            */}
        {/* ========================================================================= */}
        <section className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-md dark:shadow-[0_6px_24px_rgba(0,0,0,0.5)] space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                🎯 Évaluation & Culture Générale
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                Quiz du Patrimoine Horloger Suisse
              </h2>
            </div>

            {showQuizResults && (
              <div className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-800 dark:text-amber-300 font-mono text-sm font-bold">
                Score : {quizScore} / {SWISS_QUIZ.length}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {SWISS_QUIZ.map((q, idx) => {
              const userAnswer = selectedAnswers[q.id];
              const isAnswered = userAnswer !== undefined;

              return (
                <div key={q.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white leading-relaxed">
                      {q.question}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700';

                      if (isAnswered && showQuizResults) {
                        if (optIdx === q.correct) {
                          btnStyle = 'bg-emerald-50 text-emerald-800 border-emerald-500 dark:bg-emerald-500/20 dark:border-emerald-500/60 dark:text-emerald-300 font-medium';
                        } else if (userAnswer === optIdx) {
                          btnStyle = 'bg-rose-50 text-rose-800 border-rose-400 dark:bg-rose-500/20 dark:border-rose-500/60 dark:text-rose-300';
                        }
                      } else if (userAnswer === optIdx) {
                        btnStyle = 'bg-amber-500/20 border-amber-500/60 text-amber-800 dark:text-amber-300 font-medium';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => {
                            setSelectedAnswers(prev => ({ ...prev, [q.id]: optIdx }));
                          }}
                          className={`p-3 rounded-lg border text-left text-xs transition-all flex items-start gap-2 ${btnStyle}`}
                        >
                          <span className="font-mono text-slate-400 dark:text-slate-500 mt-0.5">{String.fromCharCode(65 + optIdx)}.</span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {showQuizResults && (
                    <div className="mt-3 p-3 rounded-lg bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-700 dark:text-amber-300">Explication historique : </strong>
                        {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800 font-mono text-xs">
            <button
              onClick={() => {
                setSelectedAnswers({});
                setShowQuizResults(false);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Réinitialiser
            </button>

            <button
              onClick={() => setShowQuizResults(true)}
              disabled={Object.keys(selectedAnswers).length === 0}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold transition-all shadow-md shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Vérifier mes Réponses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* --- BOTTOM QUICK NAVIGATION --- */}
        <section className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <Link
            href="/theorie"
            className="flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span>Retour à l&apos;Académie Théorique (16 Traités)</span>
          </Link>

          <Link
            href="/fuseaux-horaires"
            className="flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors group"
          >
            <span>Explorer la Complication des Heures du Monde Cottier</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>

      </div>
    </main>
  );
}
