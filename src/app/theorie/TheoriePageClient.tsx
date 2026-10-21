// src/app/theorie/TheoriePageClient.tsx

"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
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
  Cpu,
  Wrench,
  Book,
  Building2,
  Search,
  ArrowRight,
  Compass,
} from "lucide-react";
import { motion } from "framer-motion";

interface CourseItem {
  id: string;
  slug: string;
  moduleNumber: string;
  titre: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
  tagType: "fondamental" | "avance" | "pratique" | "culture";
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

export default function TheoriePageClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const pillars: PillarSection[] = useMemo(
    () => [
      {
        id: "mecanismes",
        pillarNumber: "Pilier I",
        title: "Le Moteur & la Cinématique Horlogère",
        subtitle:
          "La chaîne cinématique complète : du stockage de l'énergie jusqu'au régulateur d'isochronisme.",
        icon: "⚙️",
        courses: [
          {
            id: "intro",
            slug: "/theorie/introduction-montre-mecanique",
            moduleNumber: "Module 01",
            titre: "Introduction à la montre mécanique",
            description:
              "Les principes fondamentaux de la mesure du temps : les 5 grands organes cinématiques et le flux continu d'énergie mécanique.",
            icon: <Clock className="w-6 h-6 text-amber-500" />,
            tag: "Fondamental • AFP / CFC",
            tagType: "fondamental",
            readTime: "15 min de lecture",
          },
          {
            id: "barillet",
            slug: "/theorie/barillet-ressort-moteur",
            moduleNumber: "Module 02",
            titre: "Le Barillet et le Ressort Moteur",
            description:
              "Alliages Nivaflex, calcul du couple moteur, courbe de décharge, bride glissante pour automatiques et barillets en série.",
            icon: <Gauge className="w-6 h-6 text-amber-500" />,
            tag: "Fondamental • Organe Moteur",
            tagType: "fondamental",
            readTime: "20 min de lecture",
          },
          {
            id: "rouage",
            slug: "/theorie/rouage",
            moduleNumber: "Module 03",
            titre: "Le Rouage & Démultiplication",
            description:
              "Profils cycloïdaux, calcul des rapports d'engrenage, roues de centre, moyenne et seconde, pivotement sur pierres synthétiques.",
            icon: <Cog className="w-6 h-6 text-amber-500" />,
            tag: "Fondamental • Transmission",
            tagType: "fondamental",
            readTime: "25 min de lecture",
          },
          {
            id: "echappement",
            slug: "/theorie/echappement-ancre",
            moduleNumber: "Module 04",
            titre: "L'Échappement à Ancre Suisse",
            description:
              "Cinématique rigoureuse en 5 phases : repos, tirage, impulsion, chute et dégagement. Rôle crucial du dard, des cornes et de la cheville.",
            icon: <Zap className="w-6 h-6 text-purple-500" />,
            tag: "Avancé • Distribution",
            tagType: "avance",
            readTime: "30 min de lecture",
          },
          {
            id: "balancier",
            slug: "/theorie/balancier-spiral",
            moduleNumber: "Module 05",
            titre: "Le Balancier-Spiral & Régulation",
            description:
              "L'organe régulateur : formule d'isochronisme, courbe terminale Breguet, balancier Glucydur, réglage fin et spiraux en silicium.",
            icon: <Settings2 className="w-6 h-6 text-purple-500" />,
            tag: "Avancé • Chronométrie",
            tagType: "avance",
            readTime: "35 min de lecture",
          },
          {
            id: "remontage",
            slug: "/theorie/remontage",
            moduleNumber: "Module 06",
            titre: "Remontage & Mécanisme de Tirette",
            description:
              "Tige de remontoir, pignon coulant, pignon de remontoir, bascule, tirette, sautoir et rotor automatique bidirectionnel.",
            icon: <RotateCw className="w-6 h-6 text-blue-500" />,
            tag: "Pratique • Remontage",
            tagType: "pratique",
            readTime: "20 min de lecture",
          },
        ],
      },
      {
        id: "architecture",
        pillarNumber: "Pilier II",
        title: "Architecture du Calibre, Matériaux & Plans",
        subtitle:
          "De la métallurgie des alliages aux plans de coupe d'atelier conformes aux normes NIHS.",
        icon: "🏗️",
        courses: [
          {
            id: "mouvements",
            slug: "/theorie/mouvements",
            moduleNumber: "Module 07",
            titre: "Architecture du Calibre : Platine & Ponts",
            description:
              "Laiton horloger, maillechort, pont de rouage, coq de balancier, perlage, côtes de Genève et anglage main poli-miroir.",
            icon: <Boxes className="w-6 h-6 text-amber-500" />,
            tag: "Fondamental • Structure",
            tagType: "fondamental",
            readTime: "25 min de lecture",
          },
          {
            id: "lecture-plan",
            slug: "/theorie/lecture-de-plan",
            moduleNumber: "Module 08",
            titre: "Lecture de Plans Horlogers & Tolérances",
            description:
              "Normes NIHS & ISO, cartouche d'atelier, coupes et sections techniques, tolérances géométriques et ajustements micrométriques H7/g6.",
            icon: <BookOpen className="w-6 h-6 text-blue-500" />,
            tag: "Pratique • Métrologie",
            tagType: "pratique",
            readTime: "30 min de lecture",
          },
          {
            id: "materiaux",
            slug: "/materiaux",
            moduleNumber: "Module 09",
            titre: "Matériaux Nobles, Aciers & Silicium",
            description:
              "Aciers inoxydables 316L et 904L, or 18 carats, titane Grade 5, céramiques techniques et propriétés amagnétiques du silicium.",
            icon: <Gem className="w-6 h-6 text-amber-600" />,
            tag: "Culture & Métallurgie",
            tagType: "culture",
            readTime: "40 min de lecture",
          },
        ],
      },
      {
        id: "complications",
        pillarNumber: "Pilier III",
        title: "Complications & Mécanique de Haute Précision",
        subtitle:
          "Les mécanismes additionnels d'exception : chronographes, régulateurs tourbillon et révisions d'atelier.",
        icon: "🌀",
        courses: [
          {
            id: "complications-card",
            slug: "/theorie/complications",
            moduleNumber: "Module 10",
            titre: "Grandes Complications Horlogères",
            description:
              "Chronographe à roue à colonnes, quantième perpétuel à came de 48 mois, répétition minutes à timbres et tourbillon régulateur.",
            icon: <Watch className="w-6 h-6 text-purple-500" />,
            tag: "Avancé • Haute Horlogerie",
            tagType: "avance",
            readTime: "50 min de lecture",
          },
          {
            id: "technologies-card",
            slug: "/theorie/technologies",
            moduleNumber: "Module 11",
            titre: "Technologies & Régulations Modernes",
            description:
              "Échappement Co-Axial d'Omega, régulation haute fréquence (36'000 A/h), amortisseurs Paraflex / Incabloc et calibres à quartz.",
            icon: <Cpu className="w-6 h-6 text-purple-500" />,
            tag: "Avancé • Innovation",
            tagType: "avance",
            readTime: "35 min de lecture",
          },
          {
            id: "entretien-card",
            slug: "/theorie/entretien",
            moduleNumber: "Module 12",
            titre: "Entretien, Révision & Diagnostic d'Atelier",
            description:
              "Protocole de révision complète : dégraissage ultrasons, contrôle d'usure des pivots, ré-emboîtage étanche et contrôle de marche.",
            icon: <Wrench className="w-6 h-6 text-blue-500" />,
            tag: "Pratique • Atelier",
            tagType: "pratique",
            readTime: "40 min de lecture",
          },
        ],
      },
      {
        id: "patrimoine",
        pillarNumber: "Pilier IV",
        title: "Histoire & Patrimoine des Manufactures Suisses",
        subtitle:
          "Des maîtres cabinotiers genevois aux dynasties horlogères qui ont façonné l'histoire mondiale du temps.",
        icon: "🏛️",
        courses: [
          {
            id: "histoire-card",
            slug: "/theorie/histoire-horlogerie-suisse",
            moduleNumber: "Module 13",
            titre: "Histoire de l'Horlogerie Suisse",
            description:
              "Des huguenots genevois aux fermes jurassiennes : l'établissage, la révolution industrielle, la crise du quartz et la suprématie mondiale.",
            icon: <Book className="w-6 h-6 text-amber-600" />,
            tag: "Culture • Patrimoine",
            tagType: "culture",
            readTime: "30 min de lecture",
          },
          {
            id: "manufactures-card",
            slug: "/theorie/manufactures",
            moduleNumber: "Module 14",
            titre: "Monographies des Grandes Manufactures",
            description:
              "Patek Philippe, Rolex, Audemars Piguet, Vacheron Constantin : histoires fondatrices, brevets majeurs et savoir-faire d'exception.",
            icon: <Building2 className="w-6 h-6 text-amber-600" />,
            tag: "Culture • Manufactures",
            tagType: "culture",
            readTime: "45 min de lecture",
          },
        ],
      },
    ],
    []
  );

  const filteredPillars = useMemo(() => {
    return pillars
      .map((pillar) => {
        if (activeFilter !== "all" && pillar.id !== activeFilter) {
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
          courses: matchingCourses,
        };
      })
      .filter((p): p is PillarSection => p !== null);
  }, [pillars, searchTerm, activeFilter]);

  const totalCoursesCount = useMemo(() => {
    return pillars.reduce((sum, p) => sum + p.courses.length, 0);
  }, [pillars]);

  const getBadgeStyle = (tagType: CourseItem["tagType"]) => {
    switch (tagType) {
      case "fondamental":
        return "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40";
      case "avance":
        return "bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/40";
      case "pratique":
        return "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40";
      case "culture":
        return "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* Filigrane technique d'arrière-plan */}
      <div className="absolute inset-0 opacity-10 dark:opacity-15 pointer-events-none text-slate-400 dark:text-white transition-colors duration-300">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="theorie-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#theorie-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 md:py-20">
        
        {/* En-tête Haute Horlogerie Suisse */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
            📜 Traité Fondamental de Référence • Standards NIHS & COSC
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
            Théorie & Académie <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 dark:from-amber-400 dark:via-amber-300 dark:to-amber-500">
              Horlogère Suisse
            </span>
          </h1>

          <p className="text-base md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            De la cinématique des engrenages aux complications de Haute Horlogerie. Une encyclopédie vivante conçue selon les référentiels suisses pour apprentis, horlogers et passionnés de micromécanique.
          </p>

          {/* 3 Sceaux d'Excellence */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left mb-12">
            <div className="p-4 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-xl text-amber-600 dark:text-amber-400 font-bold">
                📖
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Corpus Pédagogique</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">14 Traités d'Établi</div>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-xl text-emerald-600 dark:text-emerald-400 font-bold">
                ⏱️
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Standards Suisses</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Normes NIHS & ISO 3159</div>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-xl text-indigo-600 dark:text-indigo-400 font-bold">
                🏛️
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Savoir-Faire Séculaire</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Vallée de Joux & Genève</div>
              </div>
            </div>
          </div>

          {/* Moteur de recherche d'articles */}
          <div className="max-w-2xl mx-auto relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un composant, une formule, un échappement, une manufacture..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold"
              >
                Effacer
              </button>
            )}
          </div>

          {/* Filtres par pilier */}
          <div className="flex items-center justify-center gap-2 flex-wrap text-xs font-semibold">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-full transition-all duration-200 ${
                activeFilter === "all"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400"
              }`}
            >
              Tous les traités ({totalCoursesCount})
            </button>

            <button
              onClick={() => setActiveFilter("mecanismes")}
              className={`px-4 py-2 rounded-full transition-all duration-200 ${
                activeFilter === "mecanismes"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400"
              }`}
            >
              ⚙️ Organes Fondamentaux (6)
            </button>

            <button
              onClick={() => setActiveFilter("architecture")}
              className={`px-4 py-2 rounded-full transition-all duration-200 ${
                activeFilter === "architecture"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400"
              }`}
            >
              🏗️ Calibres & Matériaux (3)
            </button>

            <button
              onClick={() => setActiveFilter("complications")}
              className={`px-4 py-2 rounded-full transition-all duration-200 ${
                activeFilter === "complications"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400"
              }`}
            >
              🌀 Complications (3)
            </button>

            <button
              onClick={() => setActiveFilter("patrimoine")}
              className={`px-4 py-2 rounded-full transition-all duration-200 ${
                activeFilter === "patrimoine"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400"
              }`}
            >
              🏛️ Histoire & Manufactures (2)
            </button>
          </div>
        </motion.div>

        {/* Liste des Piliers et Leçons */}
        {filteredPillars.length > 0 ? (
          filteredPillars.map((pillar) => (
            <div key={pillar.id} className="mb-16">
              
              {/* En-tête du Pilier */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 flex items-center justify-center text-2xl font-bold shadow-sm">
                    {pillar.icon}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      {pillar.pillarNumber} • Traité d'Atelier
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                      {pillar.title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {pillar.subtitle}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700 hidden sm:inline-block">
                  {pillar.courses.length} leçon{pillar.courses.length > 1 ? "s" : ""}
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
                    <div className="h-full bg-white dark:bg-slate-900/80 dark:backdrop-blur-lg rounded-3xl p-7 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 dark:hover:border-amber-500/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                      <div>
                        {/* Numéro du module + Badge de niveau */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                            {course.moduleNumber}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${getBadgeStyle(
                              course.tagType
                            )}`}
                          >
                            {course.tag}
                          </span>
                        </div>

                        {/* Titre du cours */}
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-2">
                          {course.titre}
                        </h3>

                        {/* Description */}
                        <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mb-6">
                          {course.description}
                        </p>
                      </div>

                      {/* Footer carte */}
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-xs text-slate-400 dark:text-slate-400 font-medium">
                          ⏱️ {course.readTime}
                        </span>
                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Accéder au cours <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-xl mx-auto">
            <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
              Aucun traité trouvé pour « <span className="font-bold text-slate-900 dark:text-white">{searchTerm}</span> ».
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveFilter("all");
              }}
              className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md"
            >
              Réinitialiser la recherche
            </button>
          </div>
        )}

        {/* Section Passerelles d'Apprentissage (Continuer l'Atelier) */}
        <div className="mt-20 p-8 md:p-12 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xl text-center">
          <div className="max-w-2xl mx-auto">
            <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
              Passerelles d'Atelier
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Mettre en Pratique la Théorie Horlogère
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-8">
              Passez de la feuille de calcul à l'établi : simulateurs interactifs de démontage, fiches de graissage Moebius et calculatrices d'ébat d'engrenage.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pratique"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:from-amber-500 text-slate-950 font-bold rounded-xl shadow-md transition-all text-sm gap-2"
              >
                <Wrench className="w-4 h-4" />
                Entrer dans l'Atelier Pratique &rarr;
              </Link>
              <Link
                href="/outils"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 transition-all text-sm gap-2"
              >
                <Compass className="w-4 h-4" />
                Outils & Calculatrices Horlogères
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
