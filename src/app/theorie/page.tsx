// src/app/theorie/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Clock,
  Gauge,
  Cog,
  Zap,
  Settings2,
  RotateCw,
  Gem,
  Boxes,
  BookOpen,
  Watch,
  Wrench,
  Book,
  Building2,
  Search,
  ArrowRight,
  ShieldCheck,
  Compass,
  Layers,
  Award,
  ExternalLink,
  ChevronRight,
  Globe
} from 'lucide-react';

// --- TYPES ---
interface CourseItem {
  id: string;
  slug: string;
  moduleNumber: string;
  titre: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
  tagType: 'fondamental' | 'avance' | 'pratique' | 'culture';
  readTime: string;
}

interface PillarSection {
  id: string;
  pillarNumber: string;
  title: string;
  subtitle: string;
  icon: string;
  courses: CourseItem[];
}

export default function TheoriePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // --- LES 4 GRANDS ESPACES & LABORATOIRES D'ÉLITE (HAUTE HORLOGERIE SHOWCASE) ---
  const eliteLaboratories = [
    {
      title: 'Écorché Éclaté 3D des Calibres Suisses',
      badge: 'Laboratoire 3D & Cinématique',
      description: 'Désossez les calibres ETA 6497-1 et 2824-2 en vue éclatée interactive. Fiches techniques complètes, tolérances d\'ébats, Côtes de Genève, perlage et protocoles Moebius.',
      href: '/theorie/galerie-3d',
      icon: <Layers className="w-6 h-6 text-amber-500" />,
      color: 'border-amber-500/40 hover:border-amber-500 bg-white dark:bg-gradient-to-br dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-950',
      badgeColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30'
    },
    {
      title: 'Musée des Grandes Complications',
      badge: 'Haute Horlogerie & Acoustique',
      description: 'Explorez le Tourbillon régulateur de Breguet, écoutez la Répétition Minutes via son synthétiseur acoustique réel Web Audio, et testez la came de 48 mois du Quantième Perpétuel.',
      href: '/theorie/complications',
      icon: <Award className="w-6 h-6 text-amber-500" />,
      color: 'border-amber-500/40 hover:border-amber-500 bg-white dark:bg-gradient-to-br dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-950',
      badgeColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30'
    },
    {
      title: 'Atelier de Restauration & Rhabillage',
      badge: 'Méthodologie d\'Établi Maître',
      description: 'Le protocole pas-à-pas des maîtres horlogers : diagnostic sous cloche, bouchonnage de platine, roulage des pivots au tour Jacot et redressement de spiral.',
      href: '/theorie/restauration',
      icon: <Wrench className="w-6 h-6 text-sky-500 dark:text-sky-400" />,
      color: 'border-sky-500/40 hover:border-sky-500 bg-white dark:bg-gradient-to-br dark:from-sky-500/10 dark:via-slate-900 dark:to-slate-950',
      badgeColor: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30'
    },
    {
      title: 'Fuseaux Horaires & Heures du Monde',
      badge: 'Complication Cottier 1931 & UTC',
      description: 'L\'art de maîtriser les 24 méridiens terrestres : mécanisme universel à bague tournante de Louis Cottier, cartographie solaire en temps réel et calibres GMT.',
      href: '/fuseaux-horaires',
      icon: <Globe className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />,
      color: 'border-emerald-500/40 hover:border-emerald-500 bg-white dark:bg-gradient-to-br dark:from-emerald-500/10 dark:via-slate-900 dark:to-slate-950',
      badgeColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
    }
  ];

  // --- LES 4 PILIERS ACADÉMIQUES COMPLETS (16 TRAITÉS D'ÉTABLI) ---
  const pillars: PillarSection[] = useMemo(
    () => [
      {
        id: 'mecanismes',
        pillarNumber: 'Pilier I',
        title: 'Le Moteur & la Cinématique Horlogère',
        subtitle: 'La chaîne cinématique complète : du stockage de l\'énergie jusqu\'au régulateur d\'isochronisme.',
        icon: '⚙️',
        courses: [
          {
            id: 'intro',
            slug: '/theorie/introduction-montre-mecanique',
            moduleNumber: 'Module 01',
            titre: 'Introduction à la montre mécanique',
            description: 'Les principes fondamentaux de la mesure du temps : les 5 grands organes cinématiques et le flux continu d\'énergie mécanique.',
            icon: <Clock className="w-6 h-6 text-amber-500" />,
            tag: 'Fondamental · AFP / CFC',
            tagType: 'fondamental',
            readTime: '15 min de lecture'
          },
          {
            id: 'barillet',
            slug: '/theorie/barillet-ressort-moteur',
            moduleNumber: 'Module 02',
            titre: 'Le Barillet et le Ressort Moteur',
            description: 'Alliages Nivaflex, calcul du couple moteur, courbe de décharge, bride glissante pour automatiques et barillets en série.',
            icon: <Gauge className="w-6 h-6 text-amber-500" />,
            tag: 'Fondamental · Organe Moteur',
            tagType: 'fondamental',
            readTime: '20 min de lecture'
          },
          {
            id: 'rouage',
            slug: '/theorie/rouage',
            moduleNumber: 'Module 03',
            titre: 'Le Rouage & Démultiplication',
            description: 'Profils cycloïdaux, calcul des rapports d\'engrenage, roues de centre, moyenne et seconde, pivotement sur pierres synthétiques.',
            icon: <Cog className="w-6 h-6 text-amber-500" />,
            tag: 'Fondamental · Transmission',
            tagType: 'fondamental',
            readTime: '25 min de lecture'
          },
          {
            id: 'echappement',
            slug: '/theorie/echappement-ancre',
            moduleNumber: 'Module 04',
            titre: 'L\'Échappement à Ancre Suisse',
            description: 'Cinématique rigoureuse en 5 phases : repos, tirage, impulsion, chute et dégagement. Rôle crucial du dard, des cornes et de la cheville.',
            icon: <Zap className="w-6 h-6 text-purple-500 dark:text-purple-400" />,
            tag: 'Avancé · Distribution',
            tagType: 'avance',
            readTime: '30 min de lecture'
          },
          {
            id: 'balancier',
            slug: '/theorie/balancier-spiral',
            moduleNumber: 'Module 05',
            titre: 'Le Balancier-Spiral & Régulation',
            description: 'L\'organe régulateur : formule d\'isochronisme, courbe terminale Breguet, balancier Glucydur, réglage fin et spiraux en silicium.',
            icon: <Settings2 className="w-6 h-6 text-purple-500 dark:text-purple-400" />,
            tag: 'Avancé · Chronométrie',
            tagType: 'avance',
            readTime: '35 min de lecture'
          },
          {
            id: 'remontage',
            slug: '/theorie/remontage',
            moduleNumber: 'Module 06',
            titre: 'Remontage & Mécanisme de Tirette',
            description: 'Tige de remontoir, pignon coulant, pignon de remontoir, bascule, tirette, sautoir et rotor automatique bidirectionnel.',
            icon: <RotateCw className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
            tag: 'Pratique · Remontage',
            tagType: 'pratique',
            readTime: '20 min de lecture'
          }
        ]
      },
      {
        id: 'architecture',
        pillarNumber: 'Pilier II',
        title: 'Architecture du Calibre, Matériaux & Plans',
        subtitle: 'De la métallurgie des alliages aux plans de coupe d\'atelier conformes aux normes NIHS.',
        icon: '📐',
        courses: [
          {
            id: 'mouvements',
            slug: '/theorie/mouvements',
            moduleNumber: 'Module 07',
            titre: 'Architecture du Calibre : Platine & Ponts',
            description: 'Laiton horloger, maillechort, pont de rouage, coq de balancier, perlage, côtes de Genève et anglage main poli-miroir.',
            icon: <Boxes className="w-6 h-6 text-amber-500" />,
            tag: 'Fondamental · Structure',
            tagType: 'fondamental',
            readTime: '25 min de lecture'
          },
          {
            id: 'lecture-plan',
            slug: '/theorie/lecture-de-plan',
            moduleNumber: 'Module 08',
            titre: 'Lecture de Plans Horlogers & Tolérances',
            description: 'Normes NIHS & ISO, cartouche d\'atelier, coupes et sections techniques, tolérances géométriques et ajustements micrométriques H7/g6.',
            icon: <BookOpen className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
            tag: 'Pratique · Métrologie',
            tagType: 'pratique',
            readTime: '30 min de lecture'
          },
          {
            id: 'materiaux',
            slug: '/materiaux',
            moduleNumber: 'Module 09',
            titre: 'Matériaux Nobles, Aciers & Silicium',
            description: 'Aciers inoxydables 316L et 904L, or 18 carats, titane Grade 5, céramiques techniques et propriétés amagnétiques du silicium.',
            icon: <Gem className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
            tag: 'Culture & Métallurgie',
            tagType: 'culture',
            readTime: '40 min de lecture'
          }
        ]
      },
      {
        id: 'complications',
        pillarNumber: 'Pilier III',
        title: 'Complications & Mécanique de Haute Précision',
        subtitle: 'Les mécanismes additionnels d\'exception : chronographes, régulateurs tourbillon, vue 3D et révisions d\'atelier.',
        icon: '💎',
        courses: [
          {
            id: 'complications-card',
            slug: '/theorie/complications',
            moduleNumber: 'Module 10',
            titre: 'Grandes Complications Horlogères',
            description: 'Chronographe à roue à colonnes, quantième perpétuel à came de 48 mois, répétition minutes à timbres et tourbillon régulateur.',
            icon: <Watch className="w-6 h-6 text-purple-500 dark:text-purple-400" />,
            tag: 'Avancé · Haute Horlogerie',
            tagType: 'avance',
            readTime: '50 min de lecture'
          },
          {
            id: 'galerie-3d-card',
            slug: '/theorie/galerie-3d',
            moduleNumber: 'Module 11',
            titre: 'Écorché Éclaté 3D & Cinématique des Calibres',
            description: 'Désossez les calibres ETA 6497-1 et 2824-2 en 3D interactive. Fiches techniques, tolérances d\'ébats et protocoles Moebius.',
            icon: <Layers className="w-6 h-6 text-amber-500" />,
            tag: 'Interactif · Vue 3D',
            tagType: 'avance',
            readTime: '45 min d\'exploration'
          },
          {
            id: 'entretien-card',
            slug: '/theorie/entretien',
            moduleNumber: 'Module 12',
            titre: 'Entretien, Révision & Diagnostic d\'Atelier',
            description: 'Protocole de révision complète : dégraissage ultrasons, contrôle d\'usure des pivots, ré-emboîtage étanche et contrôle de marche.',
            icon: <Wrench className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
            tag: 'Pratique · Atelier',
            tagType: 'pratique',
            readTime: '40 min de lecture'
          },
          {
            id: 'restauration-card',
            slug: '/theorie/restauration',
            moduleNumber: 'Module 13',
            titre: 'Atelier de Restauration & Rhabillage',
            description: 'Le protocole pas-à-pas des maîtres horlogers : diagnostic sous cloche, bouchonnage de platine, roulage des pivots au tour Jacot.',
            icon: <Settings2 className="w-6 h-6 text-sky-500 dark:text-sky-400" />,
            tag: 'Pratique · Rhabillage',
            tagType: 'pratique',
            readTime: '45 min de lecture'
          }
        ]
      },
      {
        id: 'patrimoine',
        pillarNumber: 'Pilier IV',
        title: 'Histoire, Patrimoine & Grandes Manufactures',
        subtitle: 'Des maîtres cabinotiers genevois aux dynasties horlogères et aux heures du monde.',
        icon: '🏛️',
        courses: [
          {
            id: 'histoire-card',
            slug: '/theorie/histoire-horlogerie-suisse',
            moduleNumber: 'Module 14',
            titre: 'Histoire de l\'Horlogerie Suisse',
            description: 'Des huguenots genevois aux fermes jurassiennes : l\'établissage, la révolution industrielle, la crise du quartz et la suprématie mondiale.',
            icon: <Book className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
            tag: 'Culture · Patrimoine',
            tagType: 'culture',
            readTime: '30 min de lecture'
          },
          {
            id: 'manufactures-card',
            slug: '/theorie/manufactures',
            moduleNumber: 'Module 15',
            titre: 'Monographies des Grandes Manufactures',
            description: 'Patek Philippe, Rolex, Audemars Piguet, Vacheron Constantin : histoires fondatrices, brevets majeurs et savoir-faire d\'exception.',
            icon: <Building2 className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
            tag: 'Culture · Manufactures',
            tagType: 'culture',
            readTime: '45 min de lecture'
          },
          {
            id: 'fuseaux-card',
            slug: '/fuseaux-horaires',
            moduleNumber: 'Module 16',
            titre: 'Fuseaux Horaires & Heures du Monde Cottier',
            description: 'L\'art de maîtriser les 24 méridiens : mécanisme universel de Louis Cottier (1931), calibres GMT et cartographie solaire en temps réel.',
            icon: <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
            tag: 'Voyage · Complication',
            tagType: 'avance',
            readTime: '35 min de lecture'
          }
        ]
      }
    ],
    []
  );

  // Filtrage combiné : Recherche texte + Filtre catégorie
  const filteredPillars = useMemo(() => {
    return pillars
      .map((pillar) => {
        if (activeFilter !== 'all' && pillar.id !== activeFilter) {
          return null;
        }

        const matchingCourses = pillar.courses.filter((course) => {
          if (!searchTerm.trim()) return true;
          const query = searchTerm.toLowerCase();
          return (
            course.titre.toLowerCase().includes(query) ||
            course.description.toLowerCase().includes(query) ||
            course.tag.toLowerCase().includes(query) ||
            course.moduleNumber.toLowerCase().includes(query)
          );
        });

        if (matchingCourses.length === 0) return null;

        return {
          ...pillar,
          courses: matchingCourses
        };
      })
      .filter((p): p is PillarSection => p !== null);
  }, [pillars, searchTerm, activeFilter]);

  const totalCoursesCount = useMemo(() => {
    return pillars.reduce((sum, p) => sum + p.courses.length, 0);
  }, [pillars]);

  // Style des badges de catégorie compatible Mode Clair et Sombre
  const getBadgeStyle = (tagType: CourseItem['tagType']) => {
    switch (tagType) {
      case 'fondamental':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30';
      case 'avance':
        return 'bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/30';
      case 'pratique':
        return 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/30';
      case 'culture':
        return 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    }
  };

  return (
    <main className="relative min-h-screen bg-slate-50 dark:bg-[#07090E] text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-amber-500/30 selection:text-amber-600 dark:selection:text-amber-200">
      
      {/* Background Subtle Radial Glows (dark mode only for atmospheric depth) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 hidden dark:block">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-amber-500/10 via-amber-700/5 to-transparent blur-[140px]" />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-blue-600/5 blur-[160px]" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 space-y-16">

        {/* --- BREADCRUMB & MANUFACTURE BADGE --- */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">HorloLearn</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
            <span className="text-amber-600 dark:text-amber-300 font-medium">Théorie & Académie Horlogère</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              Référentiel Suisse Convention Patronale (CP)
            </span>
          </div>
        </div>

        {/* --- HERO HEADER --- */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-mono tracking-widest uppercase shadow-sm">
            <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            Traité Fondamental de Référence · Standards NIHS & ISO 3159
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Théorie & Académie <br />
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
              Horlogère Suisse
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            De la cinématique des engrenages aux complications de Haute Horlogerie. Une encyclopédie vivante et interactive conçue selon les référentiels suisses pour apprentis AFP / CFC, horlogers et passionnés de micromécanique.
          </p>

          {/* 3 Sceaux d'Excellence */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left pt-4 font-mono">
            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm dark:shadow-none flex items-center gap-3.5 backdrop-blur-md">
              <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-xl text-amber-600 dark:text-amber-400 font-bold">
                📚
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Corpus Pédagogique</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">16 Traités d&apos;Établi</div>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm dark:shadow-none flex items-center gap-3.5 backdrop-blur-md">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-xl text-emerald-600 dark:text-emerald-400 font-bold">
                🇨🇭
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Standards Suisses</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Normes NIHS & ISO 3159</div>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm dark:shadow-none flex items-center gap-3.5 backdrop-blur-md">
              <div className="w-11 h-11 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30 flex items-center justify-center text-xl text-sky-600 dark:text-sky-400 font-bold">
                ⚡
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Savoir-Faire Séculaire</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Vallée de Joux & Genève</div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION SHOWCASE : LES 4 GRANDS LABORATOIRES D'ÉLITE --- */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                ⭐ Laboratoires Interactifs & Complications
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                Espaces d&apos;Étude & Simulateurs Haute Horlogerie
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Outils interactifs 3D, acoustiques et chronométriques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eliteLaboratories.map((lab, idx) => (
              <Link
                key={idx}
                href={lab.href}
                className={`p-7 sm:p-8 rounded-3xl border ${lab.color} shadow-md dark:shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700/60 flex items-center justify-center shadow-inner">
                      {lab.icon}
                    </div>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${lab.badgeColor}`}>
                      {lab.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                      {lab.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                      {lab.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                  <span>Accéder à l&apos;espace interactif</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* --- SECTION MOTEUR DE RECHERCHE & FILTRES DES 16 MODULES --- */}
        <section className="space-y-8 pt-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              📖 Corpus Complet des 16 Modules Académiques
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
              Les 4 Piliers Fondamentaux de la Théorie Horlogère
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Recherchez un organe, un échappement, une formule ou filtrez par pilier d&apos;apprentissage.
            </p>
          </div>

          {/* Barre de Recherche */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un composant, une formule, un échappement, une manufacture..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-20 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0D121F] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 shadow-sm focus:outline-none focus:border-amber-500 dark:focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40 transition text-sm font-sans"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white font-mono"
              >
                Effacer
              </button>
            )}
          </div>

          {/* Filtres par Pilier */}
          <div className="flex items-center justify-center gap-2 flex-wrap text-xs font-mono">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeFilter === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none'
              }`}
            >
              Tous les traités ({totalCoursesCount})
            </button>

            <button
              onClick={() => setActiveFilter('mecanismes')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeFilter === 'mecanismes'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none'
              }`}
            >
              ⚙️ Organes Fondamentaux (6)
            </button>

            <button
              onClick={() => setActiveFilter('architecture')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeFilter === 'architecture'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none'
              }`}
            >
              📐 Architecture & Plans (3)
            </button>

            <button
              onClick={() => setActiveFilter('complications')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeFilter === 'complications'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none'
              }`}
            >
              💎 Complications & Atelier (4)
            </button>

            <button
              onClick={() => setActiveFilter('patrimoine')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeFilter === 'patrimoine'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none'
              }`}
            >
              🏛️ Histoire & Manufactures (3)
            </button>
          </div>

          {/* Grille des Piliers et Traités */}
          {filteredPillars.length > 0 ? (
            <div className="space-y-16">
              {filteredPillars.map((pillar) => (
                <div key={pillar.id} className="space-y-6">
                  {/* En-tête de Pilier */}
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl font-bold shadow-sm">
                        {pillar.icon}
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                          {pillar.pillarNumber} · Traité d&apos;Établi
                        </span>
                        <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
                          {pillar.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-light">
                          {pillar.subtitle}
                        </p>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-mono hidden sm:inline-block">
                      {pillar.courses.length} leçon{pillar.courses.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Grille des Cours */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pillar.courses.map((course) => (
                      <Link
                        key={course.id}
                        href={course.slug}
                        className="group block h-full no-underline"
                      >
                        <div className="h-full bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 hover:border-amber-500/60 dark:hover:border-amber-400/80 hover:bg-slate-50/50 dark:hover:bg-[#131929] shadow-sm dark:shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.7)] transition-all duration-300 rounded-2xl p-6 flex flex-col justify-between">
                          <div>
                            {/* Numéro du module + Badge */}
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                {course.moduleNumber}
                              </span>
                              <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-medium ${getBadgeStyle(course.tagType)}`}>
                                {course.tag}
                              </span>
                            </div>

                            {/* Titre du cours */}
                            <h4 className="text-lg font-serif font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors mb-2">
                              {course.titre}
                            </h4>

                            {/* Description */}
                            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-6 font-light">
                              {course.description}
                            </p>
                          </div>

                          {/* Footer carte */}
                          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between font-mono text-xs">
                            <span className="text-slate-500">
                              ⏱️ {course.readTime}
                            </span>
                            <span className="font-bold text-amber-600 dark:text-amber-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              Accéder au traité <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-700 max-w-xl mx-auto space-y-4 shadow-sm">
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Aucun traité trouvé pour « <span className="font-bold text-slate-900 dark:text-white">{searchTerm}</span> ».
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter('all');
                }}
                className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-mono font-bold text-xs shadow-md shadow-amber-500/20"
              >
                Réinitialiser la recherche
              </button>
            </div>
          )}
        </section>

        {/* --- DOCUMENTS & RÉFÉRENCES ACADÉMIQUES OFFICIELLES --- */}
        <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                <span>Documentation Académique de Référence</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl font-light">
                Manuels officiels de la Convention Patronale de l&apos;Industrie Horlogère Suisse (CP) et standards de la Fédération Horlogère Suisse (FH).
              </p>
            </div>

            <div className="flex flex-wrap gap-3 font-mono text-xs">
              <a
                href="https://www.hautehorlogerie.org/fr/encyclopedie/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 font-bold hover:border-amber-500 border border-slate-200 dark:border-slate-700 inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Encyclopédie FHH</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              </a>
              <a
                href="https://www.fhs.swiss/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 font-bold hover:border-amber-500 border border-slate-200 dark:border-slate-700 inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Normes FH / NIHS</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              </a>
            </div>
          </div>
        </section>

        {/* --- PASSERELLES VERS L'ATELIER PRATIQUE --- */}
        <section className="pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <Link
            href="/pratique"
            className="flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span>Passer à la Pratique d&apos;Établi (Démontage, Huilage & Réglage)</span>
          </Link>

          <Link
            href="/outils"
            className="flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors group"
          >
            <span>Calculateurs Horlogers & Tables Officielles Bergeon</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>

      </div>
    </main>
  );
}
