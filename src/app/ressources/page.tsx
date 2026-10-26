'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Star,
  Award,
  Clock,
  BookOpen,
  Settings,
  ArrowRight,
  ChevronRight,
  Wrench,
  Droplet,
  Activity,
  Compass,
  Layers,
  FileText,
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'Laboratoire' | 'Fiche Calibre' | 'Dictionnaire' | 'Complication' | 'Manufacture' | 'Norme Suisse';
  category: 'Atelier' | 'Calibres' | 'Complications' | 'Marques' | 'Finitions';
  niveau: 'Fondamental' | 'Intermédiaire' | 'Avancé' | 'Expert';
  badge?: string;
  image: string;
  tags: string[];
  specs: Record<string, string | number>;
  url: string;
}

const ALL_RESOURCES: Resource[] = [
  {
    id: 'ebauches-sa',
    title: 'Dictionnaire Illustré & Codes Officiels Ebauches SA (100–8200)',
    description:
      'Nomenclature officielle suisse trilingue (FR / DE / EN) des fournitures horlogères avec schémas synoptiques et lubrifiants Moebius.',
    type: 'Dictionnaire',
    category: 'Atelier',
    niveau: 'Fondamental',
    badge: 'Officiel Ebauches SA',
    image: '/images/unitas-6497.jpg',
    tags: ['Ebauches SA', 'Codes 100-8200', 'FR/DE/EN', 'Fournitures'],
    specs: {
      codes: '100 à 8290',
      langues: 'FR · DE · EN',
      huiles: 'Moebius Certifiées',
      norme: 'NIHS',
    },
    url: '/ressources/termes-techniques',
  },
  {
    id: 'banc-chronographe',
    title: 'Banc Cinématique de Chronographe (Start / Stop / Reset)',
    description:
      'Simulation interactive Poussoir 2h / 4h : comparez la Roue à Colonnes (6 piliers) et la Came Navette (Valjoux 7750) sous loupe 10x.',
    type: 'Laboratoire',
    category: 'Complications',
    niveau: 'Expert',
    badge: 'Simulateur SVG',
    image: '/images/ressources/eta7750_chronographe.png',
    tags: ['Chronographe', 'Roue à colonnes', 'Came navette', 'Code 8080'],
    specs: {
      embrayage: 'Pignon oscillant 8080',
      commande: 'Colonnes vs Navette',
      raz: 'Marteau 8220 sur Cœur',
      loupe: '10x Interactive',
    },
    url: '/ressources/chronographe',
  },
  {
    id: 'labo-spiral',
    title: 'Laboratoire du Spiral, Courbe Phillips & Export CAO .DXF',
    description:
      'Calculateur géométrique de spiral d’Archimède, courbe terminale de Phillips (Breguet), théorème de Caspari et export CAO .DXF en un clic.',
    type: 'Laboratoire',
    category: 'Atelier',
    niveau: 'Expert',
    badge: 'Export .DXF',
    image: '/images/ressources/chronoscope_swiss_made.png',
    tags: ['Spiral', 'Phillips', 'Caspari', 'CAO .DXF'],
    specs: {
      calibres: '50+ en base',
      isochronisme: 'Courbe Phillips',
      attache: 'Théorème Caspari',
      export: 'AutoCAD .DXF',
    },
    url: '/ressources/reglage',
  },
  {
    id: 'eta-6497-sheet',
    title: 'ETA / Unitas 6497-1 — Plateau des 19 Fournitures Réelles',
    description:
      'Inspection à la loupe 10x des 19 vraies pièces détourées de l’ETA 6497-1, schéma cinématique, couples en cNm et PDF officiel.',
    type: 'Fiche Calibre',
    category: 'Calibres',
    niveau: 'Fondamental',
    badge: 'Fournitures Réelles',
    image: '/images/unitas-6497.jpg',
    tags: ['ETA 6497-1', '16½ lignes', '18 000 A/h', 'Incabloc'],
    specs: {
      diametre: '36.60 mm',
      hauteur: '4.50 mm',
      frequence: '18 000 A/h',
      angle_levee: '50°',
    },
    url: '/pratique/fiches/eta6497',
  },
  {
    id: 'eta-2824-sheet',
    title: 'ETA 2824-2 — Module Automatique & Roues Inverseuses (1488)',
    description:
      'Plan vectoriel interactif du remontage automatique bidirectionnel, raquette Etachron, alerte SW200-1 et PDF constructeur.',
    type: 'Fiche Calibre',
    category: 'Calibres',
    niveau: 'Intermédiaire',
    badge: 'Plan Interactif',
    image: '/images/eta-2824.jpg',
    tags: ['ETA 2824-2', 'Inverseuses 1488', 'Etachron', '28 800 A/h'],
    specs: {
      diametre: '25.60 mm',
      hauteur: '4.60 mm',
      frequence: '28 800 A/h',
      angle_levee: '50°',
    },
    url: '/pratique/fiches/eta2824',
  },
  {
    id: 'eta-7750-sheet',
    title: 'ETA / Valjoux 7750 — Chronographe Automatique à Came Navette',
    description:
      'Plan technique interactif du Valjoux 7750 : pignon oscillant (8080), excentriques de réglage, marteau (8220) et couples de serrage.',
    type: 'Fiche Calibre',
    category: 'Calibres',
    niveau: 'Avancé',
    badge: 'Chronographe',
    image: '/images/ressources/eta7750_chronographe.png',
    tags: ['Valjoux 7750', 'Chronographe', 'Came navette', '30.00 mm'],
    specs: {
      diametre: '30.00 mm',
      hauteur: '7.90 mm',
      rubis: 25,
      frequence: '28 800 A/h',
    },
    url: '/pratique/fiches/valjoux7750',
  },
  {
    id: 'eta-2892-sheet',
    title: 'ETA 2892-A2 — Calibre Automatique Extra-Plat Haute Horlogerie',
    description:
      'Étude complète du calibre extra-plat 3.60 mm (base Omega 1120 / IWC) : masse sur roulement à billes, sautoir de quantième et huilage.',
    type: 'Fiche Calibre',
    category: 'Calibres',
    niveau: 'Avancé',
    badge: 'Extra-Plat 3.60 mm',
    image: '/images/ressources/mouvements_header.png',
    tags: ['ETA 2892-A2', 'Extra-plat', '28 800 A/h', '51°'],
    specs: {
      diametre: '25.60 mm',
      hauteur: '3.60 mm',
      rubis: 21,
      angle_levee: '51°',
    },
    url: '/pratique/fiches/eta2892',
  },
  {
    id: 'tourbillon-breguet',
    title: 'Le Tourbillon Régulateur (Breguet 1801)',
    description:
      'Cage mobile tournant en 60 secondes pour moyenner les erreurs d’équilibre du balancier-spiral dans les positions verticales.',
    type: 'Complication',
    category: 'Complications',
    niveau: 'Expert',
    badge: 'Haute Horlogerie',
    image: '/images/ressources/tourbillon_breguet.png',
    tags: ['Breguet', 'Tourbillon', 'Cage 60s', 'Gravité'],
    specs: {
      rotation: '1 tour / 60 s',
      invention: '1801',
      organe: 'Cage + 4e roue fixe',
      masse: '< 0.50 g',
    },
    url: '/theorie/complications/tourbillon',
  },
  {
    id: 'quantieme-perpetuel',
    title: 'Quantième Perpétuel — Came de 48 Mois & Grand Levier',
    description:
      'Mémoire mécanique programmée sur 4 ans gérant automatiquement les mois de 28, 29, 30 et 31 jours.',
    type: 'Complication',
    category: 'Complications',
    niveau: 'Expert',
    badge: 'Grande Complication',
    image: '/images/ressources/complications_header.png',
    tags: ['Quantième Perpétuel', 'Came 48 mois', 'Bissextile', 'Grand levier'],
    specs: {
      memoire: '48 mois (1461 jours)',
      lune: '1 jour / 122.6 ans',
      securite: 'Zone 21h–03h',
      came: 'Encoches 28/29/30/31',
    },
    url: '/theorie/complications/calendrier-perpetuel',
  },
  {
    id: 'repetition-minutes',
    title: 'Répétition Minutes & Sonneries Acoustiques',
    description:
      'Râteaux des heures, quarts et minutes, limaçons à paliers, timbres en acier trempé et régulateur centrifuge silencieux.',
    type: 'Complication',
    category: 'Complications',
    niveau: 'Expert',
    badge: 'Acoustique',
    image: '/images/ressources/complications_header.png',
    tags: ['Répétition Minutes', 'Timbres', 'Limaçons', 'Râteaux'],
    specs: {
      sequence: 'Heures · Quarts · Minutes',
      armage: 'Verrou de sonnerie',
      regulateur: 'Volant centrifuge',
      timbres: 'Acier trempé',
    },
    url: '/theorie/complications/sonnerie',
  },
  {
    id: 'rolex-monographie',
    title: 'Rolex — Calibres Perpétuels, Parachrom & Chronergy',
    description:
      'Architecture des calibres Rolex (3135, 3235, 4130) : rotor Perpetual, spiral Parachrom bleu, antichoc Paraflex et échappement Chronergy.',
    type: 'Manufacture',
    category: 'Marques',
    niveau: 'Avancé',
    badge: 'Manufacture',
    image: '/images/ressources/rolex_4130.png',
    tags: ['Rolex', 'Calibre 3135/4130', 'Parachrom', 'Chronergy'],
    specs: {
      precision: '-2 / +2 s/j',
      echappement: 'Chronergy Nickel-Phosphore',
      spiral: 'Parachrom / Syloxi',
      acier: 'Oystersteel 904L',
    },
    url: '/theorie/manufactures/rolex',
  },
  {
    id: 'patek-monographie',
    title: 'Patek Philippe — Tradition Genevoise, Calibre 240 & Gyromax',
    description:
      'L’architecture des ponts genevois, le micro-rotor excentré du calibre 240, le balancier Gyromax et le spiral Spiromax.',
    type: 'Manufacture',
    category: 'Marques',
    niveau: 'Expert',
    badge: 'Genève',
    image: '/images/ressources/patek_calatrava.png',
    tags: ['Patek Philippe', 'Gyromax', 'Calibre 240', 'Genève'],
    specs: {
      balancier: 'Gyromax à masselottes',
      calibre_240: 'Épaisseur 2.53 mm',
      spiral: 'Spiromax (Silinvar)',
      finitions: 'Anglage main & Côtes',
    },
    url: '/theorie/manufactures/patek-philippe',
  },
  {
    id: 'finitions-decoratives',
    title: 'Finitions Décoratives : Anglage, Côtes de Genève & Perlage',
    description:
      'Techniques d’établi et critères d’excellence : anglage poli miroir à la cheville de gentiane, perlage, étirage des flancs et poli noir.',
    type: 'Norme Suisse',
    category: 'Finitions',
    niveau: 'Avancé',
    badge: 'Haute Finition',
    image: '/images/ressources/chronoscope_swiss_made.png',
    tags: ['Anglage', 'Côtes de Genève', 'Poli noir', 'Perlage'],
    specs: {
      anglage: 'Chanfrein 45° poli miroir',
      bois: 'Gentiane & Fusain',
      cotes: 'Abrasion circulaire',
      poli_noir: 'Planéité sur plaque zinc',
    },
    url: '/theorie/mouvements/finitions-decoratives',
  },
];

export default function RessourcesPage() {
  const [activeTab, setActiveTab] = useState('tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [niveauFilter, setNiveauFilter] = useState('tous');

  const filteredResources = ALL_RESOURCES.filter((resource) => {
    const matchesTab =
      activeTab === 'tous' || resource.category.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesNiveau = niveauFilter === 'tous' || resource.niveau === niveauFilter;

    return matchesTab && matchesSearch && matchesNiveau;
  });

  const tabs = [
    { id: 'tous', label: 'Toutes les ressources', count: ALL_RESOURCES.length },
    { id: 'atelier', label: 'Laboratoires & Dictionnaire', count: ALL_RESOURCES.filter((r) => r.category === 'Atelier').length },
    { id: 'calibres', label: 'Fiches Calibres', count: ALL_RESOURCES.filter((r) => r.category === 'Calibres').length },
    { id: 'complications', label: 'Complications', count: ALL_RESOURCES.filter((r) => r.category === 'Complications').length },
    { id: 'marques', label: 'Manufactures', count: ALL_RESOURCES.filter((r) => r.category === 'Marques').length },
    { id: 'finitions', label: 'Finitions', count: ALL_RESOURCES.filter((r) => r.category === 'Finitions').length },
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#07090E] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 space-y-12">
        {/* --- FIL D'ARIANE --- */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              HorloLearn
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
            <span className="text-amber-600 dark:text-amber-300 font-medium">
              Ressources, Laboratoires &amp; Fiches Constructeur
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
            Standards Officiels NIHS · Ebauches SA · ISO 3159
          </span>
        </div>

        {/* --- HERO HEADER (Typographie éditoriale alignée sur /theorie) --- */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-mono tracking-widest uppercase shadow-sm">
            <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            Bibliothèque Technique &amp; Simulateurs d’Établi
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Ressources &amp; Archives <br />
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
              Horlogerie Suisse
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Accédez directement aux laboratoires interactifs SVG (ménisque d’huile Moebius, banc chronographe, calcul de spiral .DXF, inspection des pannes sous binoculaire), au dictionnaire Ebauches SA et aux fiches techniques officielles.
          </p>
        </div>

        {/* --- DOCK D'ACCÈS RAPIDE AUX 6 LABORATOIRES D'ATELIER --- */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-extrabold text-slate-900 dark:text-white">
              Accès Direct aux 6 Laboratoires &amp; Référentiels d’Établi
            </h2>
            <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-bold">
              Loupe 10x &amp; Schémas Vectoriels SVG
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: '/pratique/huilage',
                badge: 'Moebius 9010 & 9415',
                title: 'Comparateur Visuel SVG du Ménisque d’Huile',
                desc: 'Curseur micrométrique sous binoculaire 40x : ménisque Incabloc (2/3) et bourrelet thixotrope sur palette d’ancre.',
                icon: <Droplet className="w-5 h-5 text-amber-500" />,
              },
              {
                href: '/theorie/entretien/diagnostic-pannes',
                badge: 'Inspection 40x & Witschi',
                title: 'Comparateur des Défauts & Usures d’Atelier',
                desc: 'Pivot de balancier en champignon, jeu aux goupilles de raquette, spires aimantées et quantième forcé.',
                icon: <Activity className="w-5 h-5 text-rose-500" />,
              },
              {
                href: '/ressources/chronographe',
                badge: 'Start 2h / Stop 2h / Reset 4h',
                title: 'Banc Cinématique de Chronographe Interactif',
                desc: 'Actionnez en direct la Roue à Colonnes vs Came Navette 7750, le pignon oscillant (8080) et les marteaux.',
                icon: <Clock className="w-5 h-5 text-cyan-500" />,
              },
              {
                href: '/ressources/reglage',
                badge: 'Export CAO .DXF',
                title: 'Laboratoire du Spiral & Courbe Phillips',
                desc: 'Tracé géométrique d’Archimède, courbe terminale Breguet, théorème de Caspari et téléchargement .DXF.',
                icon: <Compass className="w-5 h-5 text-emerald-500" />,
              },
              {
                href: '/ressources/termes-techniques',
                badge: 'Codes 100 à 8200',
                title: 'Dictionnaire Illustré Ebauches SA (FR/DE/EN)',
                desc: 'Nomenclature officielle des fournitures suisses avec traduction allemande/anglaise et huiles associées.',
                icon: <Layers className="w-5 h-5 text-purple-500" />,
              },
              {
                href: '/pratique/fiches',
                badge: '6497 · 2824 · 7750 · 2892',
                title: 'Les 4 Fiches Techniques Constructeur',
                desc: 'Plans techniques vectoriels, 19 vraies fournitures détourées, couples de serrage en cNm et PDF officiels.',
                icon: <FileText className="w-5 h-5 text-amber-500" />,
              },
            ].map((lab, i) => (
              <Link
                key={i}
                href={lab.href}
                className="group p-5 rounded-2xl bg-white dark:bg-[#0f1422] border border-slate-200 dark:border-slate-800 hover:border-amber-500 transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                      {lab.icon}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                      {lab.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-1.5">
                    {lab.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {lab.desc}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 mt-4">
                  Ouvrir le module <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* --- FILTRES & RECHERCHE DU CATALOGUE --- */}
        <section className="bg-white dark:bg-[#0f1422] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher un calibre (6497, 2824, 7750, 2892), un code Ebauches SA, une complication..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <select
              value={niveauFilter}
              onChange={(e) => setNiveauFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value="tous">Tous niveaux</option>
              <option value="Fondamental">Fondamental</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Avancé">Avancé</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </section>

        {/* --- GRILLE DES RESSOURCES (100% LIENS INTERNES VÉRIFIÉS) --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Link
              key={resource.id}
              href={resource.url}
              className="group bg-white dark:bg-[#0f1422] rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 transition-all duration-300 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 bg-slate-900 overflow-hidden">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {resource.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500 text-slate-950">
                        {resource.badge}
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-900/85 text-white">
                      {resource.type}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-2 leading-snug">
                    {resource.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {resource.description}
                  </p>

                  <div className="bg-slate-50 dark:bg-[#141a2b] rounded-xl p-3 border border-slate-200/70 dark:border-slate-800 mb-3">
                    <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                      {Object.entries(resource.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between gap-1">
                          <span className="text-slate-500 capitalize">{key.replace('_', ' ')}:</span>
                          <span className="font-mono font-bold text-slate-900 dark:text-white truncate">
                            {String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {resource.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-amber-500/10 text-amber-700 dark:text-amber-300 rounded text-[10px] font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
