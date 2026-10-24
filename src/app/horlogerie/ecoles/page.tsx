// src/app/horlogerie/ecoles/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Search,
  MapPin,
  Sparkles,
  Award,
  Building2,
  ExternalLink,
  ArrowRight,
  ChevronRight,
  SlidersHorizontal,
  CheckCircle2,
  Layers,
  ShieldCheck,
  BookOpen,
  Compass,
  Star,
  Check,
  RotateCcw
} from 'lucide-react';

interface School {
  id: string;
  name: string;
  shortName: string;
  canton: 'GE' | 'VD' | 'NE' | 'JU' | 'BE' | 'SO';
  cantonName: string;
  city: string;
  founded: string;
  type: string;
  category: string;
  degrees: ('AFP' | 'CFC' | 'ES' | 'HES' | 'WOSTEP' | 'ADULTES')[];
  diplomasList: string[];
  desc: string;
  highlight: string;
  tags: string[];
  href: string;
  externalUrl: string;
  badgeColor: string;
}

const SCHOOLS_DATA: School[] = [
  {
    id: 'cfpt-geneve',
    name: 'CFPT – École d’Horlogerie de Genève',
    shortName: 'CFPT Horlogerie',
    canton: 'GE',
    cantonName: 'Genève',
    city: 'Plan-les-Ouates (Genève)',
    founded: '1824',
    type: 'École des Métiers Publique',
    category: 'Établissement Cantonal d’Élite',
    degrees: ['AFP', 'CFC'],
    diplomasList: ['AFP Opérateur en Horlogerie', 'CFC Horloger Praticien (3 ans)', 'CFC Horloger (4 ans)', 'Maturité Professionnelle Technique'],
    desc: 'Fondée en 1824, l’École d’Horlogerie de Genève forme depuis deux siècles les artisans des plus illustres manufactures. Située à Plan-les-Ouates au cœur de la Watch Valley genevoise.',
    highlight: 'Proximité directe avec Patek Philippe, Vacheron Constantin et Rolex',
    tags: ['Établi Traditionnel', 'Rhabillage', 'Ateliers Modernes'],
    href: '/horlogerie/ecoles/cfpt-geneve',
    externalUrl: 'https://www.ge.ch/ecole-horlogerie-geneve',
    badgeColor: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30'
  },
  {
    id: 'ifage-geneve',
    name: 'Ifage – Fondation pour la Formation des Adultes',
    shortName: 'Ifage Horlogerie',
    canton: 'GE',
    cantonName: 'Genève',
    city: 'Genève',
    founded: 'Reconversion',
    type: 'Formation Continue & Professionnelle',
    category: 'Pôle Adulte & Reconversion',
    degrees: ['AFP', 'ADULTES'],
    diplomasList: ['AFP Opérateur en Horlogerie (Adultes)', 'Certificats de Branche d’Établi', 'Modules du Soir & Emploi'],
    desc: 'Centre d’excellence pour la formation continue et la reconversion d’adultes vers les métiers d’établi. Permet de préparer les titres officiels en horaire adapté.',
    highlight: 'Partenaire de l’Union des Fabricants d’Horlogerie de Genève',
    tags: ['Reconversion', 'Validation Acquis (Art. 32)', 'Cours du Soir'],
    href: '/horlogerie/ecoles/ifage-geneve',
    externalUrl: 'https://www.ifage.ch',
    badgeColor: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30'
  },
  {
    id: 'cfp-arts-geneve',
    name: 'CFP Arts – Pôle Métiers d’Art & Gravure',
    shortName: 'CFP Arts Genève',
    canton: 'GE',
    cantonName: 'Genève',
    city: 'Genève',
    founded: '1876',
    type: 'École d’Arts Appliqués',
    category: 'Métiers d’Art & Haute Joaillerie',
    degrees: ['CFC'],
    diplomasList: ['CFC Gravure Horlogère', 'CFC Sertissage', 'CFC Bijouterie-Joaillerie'],
    desc: 'La prestigieuse institution genevoise dédiée aux métiers d’art du garde-temps : gravure main taille-douce, sertissage de pierres précieuses et finition d’habillage.',
    highlight: 'L’unique école publique romande enseignant la gravure horlogère',
    tags: ['Gravure Main', 'Sertissage', 'Métiers d’Art'],
    href: '/horlogerie/ecoles/cfp-arts-geneve',
    externalUrl: 'https://www.cfparts.ch',
    badgeColor: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30'
  },
  {
    id: 'hepia-geneve',
    name: 'HEPIA – Haute École d’Ingénierie de Genève',
    shortName: 'HEPIA Ingénierie',
    canton: 'GE',
    cantonName: 'Genève',
    city: 'Genève',
    founded: 'HES-SO',
    type: 'Haute École Spécialisée',
    category: 'Ingénierie & R&D',
    degrees: ['HES'],
    diplomasList: ['Bachelor of Science HES Microtechniques', 'Master MSE en Systèmes Complexes'],
    desc: 'Formation universitaire d’ingénieurs spécialisés dans la modélisation CAO, les micro-capteurs, la dynamique des échappements et l’industrialisation horlogère de pointe.',
    highlight: 'Laboratoires de R&D appliquée directement liés aux manufactures',
    tags: ['Ingénierie HES', 'CAO 3D', 'Matériaux Avancés'],
    href: '/horlogerie/ecoles/hepia-geneve',
    externalUrl: 'https://www.hesge.ch/hepia',
    badgeColor: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30'
  },
  {
    id: 'etvj-le-sentier',
    name: 'ETVJ – École Technique de la Vallée de Joux',
    shortName: 'ETVJ Le Sentier',
    canton: 'VD',
    cantonName: 'Vaud',
    city: 'Le Sentier (Vallée de Joux)',
    founded: '1901',
    type: 'Centre d’Excellence Horlogère & Micromécanique',
    category: 'Temple des Grandes Complications',
    degrees: ['AFP', 'CFC', 'ES'],
    diplomasList: ['AFP Opérateur', 'CFC Horloger (3 et 4 ans)', 'CFC Micromécanicien', 'Technicien ES Horlogerie'],
    desc: 'Établissement mythique niché au cœur de la Vallée de Joux, berceau des tourbillons, calendriers perpétuels et répétitions minutes. L’anglage main y est élevé au rang d’art absolu.',
    highlight: 'Entourée par Audemars Piguet, Jaeger-LeCoultre, Blancpain et Philippe Dufour',
    tags: ['Grandes Complications', 'Anglage Main', 'Micromécanique'],
    href: '/horlogerie/ecoles/etvj-le-sentier',
    externalUrl: 'https://www.etvj.ch',
    badgeColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'heigvd-yverdon',
    name: 'HEIG-VD – Haute École d’Ingénierie du Canton de Vaud',
    shortName: 'HEIG-VD Yverdon',
    canton: 'VD',
    cantonName: 'Vaud',
    city: 'Yverdon-les-Bains',
    founded: 'HES-SO',
    type: 'Haute École Spécialisée',
    category: 'Génie Mécanique & Microtechnique',
    degrees: ['HES'],
    diplomasList: ['Bachelor HES en Microtechnique Horlogère', 'Master of Science HES'],
    desc: 'Pôle d’ingénierie de pointe axé sur la simulation par éléments finis, l’analyse tribologique des huiles et lubrifiants, et les machines-outils CNC d’ultra-précision.',
    highlight: 'Laboratoires de tribologie et métrologie de référence internationale',
    tags: ['Tribologie', 'Usinage 5 Axes', 'Modélisation'],
    href: '/horlogerie/ecoles/heigvd-yverdon',
    externalUrl: 'https://www.heig-vd.ch',
    badgeColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'cpne-le-locle',
    name: 'CPNE – Pôle Technologies & Horlogerie du Locle',
    shortName: 'CPNE Le Locle',
    canton: 'NE',
    cantonName: 'Neuchâtel',
    city: 'Le Locle',
    founded: '1868',
    type: 'École des Métiers Historique',
    category: 'Patrimoine Mondial UNESCO',
    degrees: ['AFP', 'CFC', 'ES'],
    diplomasList: ['AFP Opérateur', 'CFC Horloger Praticien & Complet', 'Technicien ES Microtechnique'],
    desc: 'L’ancienne École d’Horlogerie du Locle, berceau historique suisse fondé en 1868. Elle allie la tradition du rhabillage aux équipements CNC et tours Schaublin contemporains.',
    highlight: 'Restauration de garde-temps historiques et pièces de collection',
    tags: ['Tours Schaublin', 'Restauration', 'Tradition Horlogère'],
    href: '/horlogerie/ecoles/cpne-le-locle',
    externalUrl: 'https://www.cpne.ch',
    badgeColor: 'bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/30'
  },
  {
    id: 'cpne-aa-chauxdefonds',
    name: 'CPNE AA – Pôle Arts Appliqués & Habillage',
    shortName: 'CPNE Arts Appliqués',
    canton: 'NE',
    cantonName: 'Neuchâtel',
    city: 'La Chaux-de-Fonds',
    founded: '1872',
    type: 'École d’Arts Appliqués',
    category: 'Finitions & Habillage Horloger',
    degrees: ['CFC'],
    diplomasList: ['CFC Décorateur Horloger', 'CFC Graveur', 'CFC Sertisseur', 'Design Horloger'],
    desc: 'Centre d’excellence pour les finitions d’exception : côtes de Genève, perlage, soleillage, anglages bercés et création esthétique de boîtes et cadrans.',
    highlight: 'Située dans la métropole horlogère classée au patrimoine de l’UNESCO',
    tags: ['Côtes de Genève', 'Perlage', 'Design Cadrans'],
    href: '/horlogerie/ecoles/cpne-aa-chauxdefonds',
    externalUrl: 'https://www.cpne.ch',
    badgeColor: 'bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/30'
  },
  {
    id: 'haute-ecole-arc',
    name: 'Haute École Arc Ingénierie',
    shortName: 'HE-Arc Ingénierie',
    canton: 'NE',
    cantonName: 'Neuchâtel',
    city: 'Le Locle & Neuchâtel',
    founded: 'HES-SO',
    type: 'Haute École Spécialisée',
    category: 'Conception & Innovation Horlogère',
    degrees: ['HES'],
    diplomasList: ['Bachelor HES en Ingénierie Horlogère', 'MAS en Conception Horlogère'],
    desc: 'Formation de haut niveau en ingénierie horlogère. Travaille sur les organes réglants en silicium, les architectures d’échappement alternatives et la chronométrie avancée.',
    highlight: 'Partenariats de recherche scientifique avec le CSEM et le COSC',
    tags: ['Silicium', 'Chronométrie COSC', 'R&D Mouvement'],
    href: '/horlogerie/ecoles/haute-ecole-arc',
    externalUrl: 'https://www.he-arc.ch/ingenierie',
    badgeColor: 'bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/30'
  },
  {
    id: 'wostep-neuchatel',
    name: 'Fondation WOSTEP',
    shortName: 'WOSTEP Neuchâtel',
    canton: 'NE',
    cantonName: 'Neuchâtel',
    city: 'Neuchâtel',
    founded: '1966',
    type: 'Centre International d’Élite',
    category: 'Label Mondial de Perfectionnement',
    degrees: ['WOSTEP'],
    diplomasList: ['Programme 3000 Heures Watchmaker', 'Complications & Chronographes', 'Certification Formateur'],
    desc: 'Créée par les manufactures suisses en 1966, la Fondation WOSTEP est l’étalon-or international de la formation horlogère. Ses diplômés sont recherchés dans le monde entier.',
    highlight: 'La référence mondiale absolue pour le SAV et la Haute Horlogerie',
    tags: ['Standard Mondial', '3000 Heures', 'Élite SAV'],
    href: '/horlogerie/ecoles/wostep-neuchatel',
    externalUrl: 'https://www.wostep.ch',
    badgeColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30'
  },
  {
    id: 'cejef-porrentruy',
    name: 'CEJEF – Division Technique de Porrentruy',
    shortName: 'CEJEF Porrentruy',
    canton: 'JU',
    cantonName: 'Jura',
    city: 'Porrentruy',
    founded: '1896',
    type: 'École des Métiers Publique',
    category: 'Micromécanique & Décolletage',
    degrees: ['AFP', 'CFC', 'ES'],
    diplomasList: ['AFP Opérateur', 'CFC Horloger (3 et 4 ans)', 'CFC Micromécanicien', 'Technicien ES'],
    desc: 'Implanté dans le Jura, bassin manufacturier d’usinage et de décolletage. L’école forme des horlogers et micromécaniciens experts dans la fabrication des composants les plus délicats.',
    highlight: 'Liaison directe avec le tissu industriel jurassien de sous-traitance d’élite',
    tags: ['Décolletage', 'Composants', 'Outillage'],
    href: '/horlogerie/ecoles/cejef-porrentruy',
    externalUrl: 'https://www.cejef.ch',
    badgeColor: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30'
  },
  {
    id: 'lycee-technique-bienne',
    name: 'Lycée Technique de Bienne (CFP Bienne)',
    shortName: 'CFP Bienne',
    canton: 'BE',
    cantonName: 'Berne',
    city: 'Bienne',
    founded: '1873',
    type: 'Centre de Formation Bilingue',
    category: 'Bilinguisme Français / Allemand',
    degrees: ['CFC'],
    diplomasList: ['CFC Horloger Praticien & Complet (FR / DE)', 'CFC Micromécanicien', 'Maturité Technique'],
    desc: 'L’école bilingue par excellence, installée à Bienne, métropole mondiale du Swatch Group, d’Omega et des ateliers de mouvements Rolex. Offre un passeport précieux pour les deux régions linguistiques.',
    highlight: 'Enseignement bilingue ouvrant les carrières en Romandie et Suisse alémanique',
    tags: ['Bilingue FR/DE', 'Omega & Swatch Group', 'Calibres Modernes'],
    href: '/horlogerie/ecoles/lycee-technique-bienne',
    externalUrl: 'https://www.cfp-biel-bienne.ch',
    badgeColor: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/30'
  },
  {
    id: 'ceff-st-imier',
    name: 'CEFF – Centre de Formation Berne Francophone',
    shortName: 'CEFF Saint-Imier',
    canton: 'BE',
    cantonName: 'Berne',
    city: 'Saint-Imier',
    founded: '1860',
    type: 'École Technique Jurassienne',
    category: 'Tradition Jurassienne Bernoise',
    degrees: ['CFC'],
    diplomasList: ['CFC Horloger de Production', 'CFC Micromécanicien', 'Certificats d’Atelier'],
    desc: 'Au cœur du vallon de Saint-Imier, berceau historique de Longines. L’établissement dispense un enseignement rigoureux centré sur la précision d’usinage et le montage en manufacture.',
    highlight: 'Liens historiques étroits avec la manufacture Longines',
    tags: ['Saint-Imier', 'Production Mouvements', 'Atelier Moderne'],
    href: '/horlogerie/ecoles/ceff-st-imier',
    externalUrl: 'https://www.ceff.ch',
    badgeColor: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/30'
  },
  {
    id: 'zeitzentrum-granges',
    name: 'ZeitZentrum – Uhrmacherschule Grenchen',
    shortName: 'ZeitZentrum Grenchen',
    canton: 'SO',
    cantonName: 'Soleure',
    city: 'Granges (Grenchen)',
    founded: '1884',
    type: 'École Horlogère Alémanique',
    category: 'Pôle Horloger Alémanique',
    degrees: ['CFC', 'ES'],
    diplomasList: ['Uhrmacher EFZ (CFC 4 ans)', 'Uhrmacherpraktiker (CFC 3 ans)', 'Restaurator Weiterbildung'],
    desc: 'L’unique et prestigieuse école d’horlogerie de Suisse alémanique. Établie à Granges, capitale de la fabrication de calibres ETA et Breitling. Dispense des cours d’une précision exemplaire.',
    highlight: 'Partenariat stratégique avec ETA Manufacture et les maisons de Granges',
    tags: ['Suisse Alémanique', 'ETA Calibres', 'Précision Germanique'],
    href: '/horlogerie/ecoles/zeitzentrum-granges',
    externalUrl: 'https://www.zeitzentrum.ch',
    badgeColor: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30'
  }
];

const CANTON_FILTERS = [
  { id: 'all', label: 'Tous les Cantons', count: 14 },
  { id: 'GE', label: 'Genève • GE', count: 4 },
  { id: 'VD', label: 'Vaud • VD', count: 2 },
  { id: 'NE', label: 'Neuchâtel • NE', count: 4 },
  { id: 'JU', label: 'Jura • JU', count: 1 },
  { id: 'BE', label: 'Berne • BE', count: 2 },
  { id: 'SO', label: 'Soleure • SO', count: 1 }
];

const DEGREE_FILTERS = [
  { id: 'all', label: 'Tous les diplômes' },
  { id: 'AFP', label: 'AFP (2 ans)' },
  { id: 'CFC', label: 'CFC Horloger (3-4 ans)' },
  { id: 'ES', label: 'Technicien ES / Complications' },
  { id: 'HES', label: 'Ingénieur HES' },
  { id: 'WOSTEP', label: 'Label WOSTEP' },
  { id: 'ADULTES', label: 'Formation Continue Adultes' }
];

export default function EcolesHorlogeriePage() {
  const [selectedCanton, setSelectedCanton] = useState<string>('all');
  const [selectedDegree, setSelectedDegree] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSchools = useMemo(() => {
    return SCHOOLS_DATA.filter((school) => {
      const matchCanton = selectedCanton === 'all' || school.canton === selectedCanton;
      const matchDegree = selectedDegree === 'all' || school.degrees.includes(selectedDegree as any);
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        school.name.toLowerCase().includes(q) ||
        school.city.toLowerCase().includes(q) ||
        school.cantonName.toLowerCase().includes(q) ||
        school.desc.toLowerCase().includes(q) ||
        school.diplomasList.some((d) => d.toLowerCase().includes(q)) ||
        school.tags.some((t) => t.toLowerCase().includes(q));

      return matchCanton && matchDegree && matchSearch;
    });
  }, [selectedCanton, selectedDegree, searchQuery]);

  const resetFilters = () => {
    setSelectedCanton('all');
    setSelectedDegree('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* --- HERO HEADER CINÉMATIQUE --- */}
      <section className="relative pt-16 pb-12 overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-gradient-to-b dark:from-slate-900 dark:via-[#0a0e1a] dark:to-[#07090e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#E2B44F]/10 border border-[#E2B44F]/30 text-amber-800 dark:text-[#E2B44F] text-xs font-mono font-bold tracking-wider uppercase shadow-sm">
            <span>🇨🇭</span>
            <span>Confédération Suisse • Répertoire National des Écoles d’Élite</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight text-slate-900 dark:text-white leading-tight">
            Les Écoles d’Horlogerie &amp; <br />
            <span className="bg-gradient-to-r from-amber-600 via-[#E2B44F] to-[#D4AF37] dark:from-[#D4AF37] dark:via-[#F4E5B8] dark:to-[#E2B44F] bg-clip-text text-transparent">
              de Microtechnique en Suisse
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            De la mythique Vallée de Joux aux rives historiques de Genève, Neuchâtel et Bienne, découvrez les{' '}
            <strong className="text-slate-900 dark:text-white font-medium">14 institutions suisses d’excellence</strong>. Où s’apprennent la rigueur du micron, les complications mécaniques et l’art séculaire du rhabillage.
          </p>

          {/* 4 Indicateurs Clés */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto text-left pt-6 font-mono text-xs">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl">
              <div className="text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider">Campus Répertoriés</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">14 Écoles</div>
              <div className="text-[#E2B44F] mt-1 font-sans text-xs">6 Cantons Horlogers</div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl">
              <div className="text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider">Niveaux de Titres</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">AFP à HES</div>
              <div className="text-emerald-600 dark:text-emerald-400 mt-1 font-sans text-xs">Titres Protégés SEFRI &amp; CP</div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl">
              <div className="text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider">Label International</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">WOSTEP</div>
              <div className="text-cyan-600 dark:text-cyan-400 mt-1 font-sans text-xs">Norme Mondiale d’Évaluation</div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl">
              <div className="text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider">Taux d’Insertion</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">&gt; 98 %</div>
              <div className="text-amber-600 dark:text-amber-400 mt-1 font-sans text-xs">Manufactures &amp; SAV Suisse</div>
            </div>
          </div>

        </div>
      </section>

      {/* --- CORPS PRINCIPAL & FILTRES --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* BARRE D'OUTILS : RECHERCHE + FILTRES */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border-2 border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
          
          {/* Ligne Recherche + Compteur */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute inset-y-0 left-3.5 my-auto text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une école, une ville, une formation (ex: CFPT, Vallée de Joux, HES, CFC, WOSTEP)..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#E2B44F] transition-colors"
              />
            </div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2 flex-shrink-0">
              <span>Établissements visibles :</span>
              <span className="px-2.5 py-1 rounded-md bg-[#E2B44F]/20 text-amber-900 dark:text-amber-300 font-bold border border-[#E2B44F]/40">
                {filteredSchools.length} / {SCHOOLS_DATA.length}
              </span>
            </div>
          </div>

          {/* Filtres par Canton */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#E2B44F]" />
              <span>Filtrer par Canton Horloger :</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {CANTON_FILTERS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCanton(c.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCanton === c.id
                      ? 'bg-[#E2B44F] text-slate-950 shadow-md scale-105 font-extrabold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {c.label} ({c.count})
                </button>
              ))}
            </div>
          </div>

          {/* Filtres par Diplôme */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#E2B44F]" />
              <span>Filtrer par Filière de Diplôme :</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {DEGREE_FILTERS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDegree(d.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedDegree === d.id
                      ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* GRILLE DES ÉCOLES */}
        {filteredSchools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchools.map((school) => (
              <div
                key={school.id}
                className="group relative flex flex-col justify-between p-7 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-[#E2B44F] dark:hover:border-[#E2B44F] rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 transform hover:-translate-y-1.5"
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold border ${school.badgeColor}`}>
                      Canton {school.canton} • {school.cantonName}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {school.founded.startsWith('18') || school.founded.startsWith('19')
                        ? 'Fondée en ' + school.founded
                        : school.founded}
                    </span>
                  </div>

                  {/* Title & City */}
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E2B44F]">
                      {school.category}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mt-1 group-hover:text-[#E2B44F] transition-colors">
                      {school.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-[#E2B44F]" />
                      <span>{school.city}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    {school.desc}
                  </p>

                  {/* Atout d'Excellence */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 text-[11px] text-amber-800 dark:text-amber-300/90 flex items-start gap-2">
                    <Star className="w-4 h-4 text-[#E2B44F] flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{school.highlight}</span>
                  </div>

                  {/* Diplômes Dispensés */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                      Filières dispensées :
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {school.diplomasList.map((d, dIdx) => (
                        <span
                          key={dIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <Link
                    href={school.href}
                    className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-[#E2B44F] text-slate-800 dark:text-slate-200 group-hover:text-slate-950 border border-slate-200 dark:border-slate-700 group-hover:border-[#E2B44F] text-xs font-mono font-bold transition-all shadow-sm"
                  >
                    <span>Découvrir la fiche complète</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <div className="flex justify-between items-center px-1 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <a
                      href={school.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#E2B44F] transition-colors flex items-center gap-1"
                    >
                      <span>Site officiel</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">✓ Reconnu SEFRI</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <Search className="w-10 h-10 mx-auto text-slate-400" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Aucun établissement ne correspond à votre recherche</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Essayez de réinitialiser vos filtres ou d’utiliser un terme plus général (ex: Genève, CFC, Microtechnique).
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 px-4 py-2 rounded-xl bg-[#E2B44F] text-slate-950 text-xs font-bold font-mono inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Réinitialiser les filtres</span>
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION DIDACTIQUE : LA PYRAMIDE DU SYSTÈME HORLOGER SUISSE               */}
        {/* ========================================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-[#0d1222] dark:to-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-2xl space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E2B44F]">
              📜 Filières Officielles de l’Industrie
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
              La Pyramide des Diplômes Horlogers Suisses
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
              Le système dual suisse est mondialement reconnu pour son équilibre parfait entre théorie scientifique et gestes d’atelier au centième de millimètre.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            {/* 1. AFP */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3 hover:border-amber-500/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 text-[10px] font-bold border border-amber-500/30">
                  Niveau 1 • 2 Ans
                </span>
                <span className="text-slate-400">AFP</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white font-sans">Opérateur en Horlogerie</h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Formation pratique axée sur l’emboîtage, la pose de cadrans et aiguilles, le contrôle d’étanchéité et les opérations d’assemblage de série.
              </p>
              <div className="text-[10px] text-amber-600 dark:text-amber-400 pt-2 border-t border-slate-200 dark:border-slate-800 font-bold">
                Passerelle directe vers le CFC
              </div>
            </div>

            {/* 2. CFC */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3 hover:border-emerald-500/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  Niveau 2 • 3 ou 4 Ans
                </span>
                <span className="text-slate-400">CFC</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white font-sans">Horloger Praticien &amp; Complet</h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Le pilier suisse : usinage micromécanique, tournage Schaublin, réglage d’échappement, rhabillage de calibres mécaniques et automatiques.
              </p>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-200 dark:border-slate-800 font-bold">
                Accès aux métiers de haute volée
              </div>
            </div>

            {/* 3. TECHNICIEN ES */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3 hover:border-cyan-500/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-[10px] font-bold border border-cyan-500/30">
                  Niveau 3 • 2 Ans Post-CFC
                </span>
                <span className="text-slate-400">Dipl. ES</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white font-sans">Technicien ES &amp; Complications</h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Restauration de pièces historiques, réglage de tourbillons, chronographes à roue à colonnes et répétitions minutes.
              </p>
              <div className="text-[10px] text-cyan-600 dark:text-cyan-400 pt-2 border-t border-slate-200 dark:border-slate-800 font-bold">
                Ateliers Grandes Complications
              </div>
            </div>

            {/* 4. INGÉNIEUR HES */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3 hover:border-purple-500/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-400 text-[10px] font-bold border border-purple-500/30">
                  Niveau 4 • 3 Ans HES
                </span>
                <span className="text-slate-400">BSc / MSc</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white font-sans">Ingénieur Microtechnique HES</h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Conception CAO 3D de nouveaux mouvements de manufacture, dynamique des spiraux, matériaux d’avant-garde (silicium) et R&amp;D.
              </p>
              <div className="text-[10px] text-purple-600 dark:text-purple-400 pt-2 border-t border-slate-200 dark:border-slate-800 font-bold">
                Bureaux techniques &amp; R&amp;D
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION TEST D'HABILITÉ & CONCOURS D'ENTRÉE                              */}
        {/* ========================================================================= */}
        <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E2B44F]">
                🎯 Réussir son Entrée en École
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                Les 3 Épreuves Clés du Test d’Admission
              </h2>
            </div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Évaluation manuelle &amp; psychotechnique
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-light">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="font-mono font-bold text-amber-700 dark:text-amber-400 text-sm">01. Test de Pliage de Fil</div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Reproduire fidèlement un dessin géométrique complexe en pliant un fil de fer ou de cuivre avec des pinces plates et rondes, au dixième de millimètre près.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="font-mono font-bold text-amber-700 dark:text-amber-400 text-sm">02. Test de Dextérité aux Brucelles</div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Transvaser et positionner des goupilles et billes microscopiques dans des logements étroits sans faire trembler la main ni faire sauter le composant.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="font-mono font-bold text-amber-700 dark:text-amber-400 text-sm">03. Perception Tridimensionnelle</div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Lecture de vues techniques orthogonales (face, profil, dessus) et dessin d’une pièce en perspective pour évaluer la vision spatiale indispensable à l’établi.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
