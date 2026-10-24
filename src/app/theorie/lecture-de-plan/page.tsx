"use client";

import Link from "next/link";
import {
  Layers,
  LineChart,
  Ruler,
  Grid,
  FileText,
  Cog,
  ArrowRight,
  Compass,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen
} from "lucide-react";

type ModuleSection = {
  moduleNumber: string;
  norm: string;
  title: string;
  desc: string;
  href: string;
  isKey?: boolean;
  colorScheme: {
    lightBg: string;
    lightBorder: string;
    lightIcon: string;
    lightBadge: string;
    darkBadge: string;
    gradient: string;
  };
  icon: typeof Layers;
};

export default function LectureDePlan() {
  const sections: ModuleSection[] = [
    {
      moduleNumber: "Module 01",
      norm: "ISO 128-3",
      title: "Vues Techniques",
      desc: "Comprendre les projections orthogonales européennes, coupes partielles et sections brisées. La base absolue de toute lecture de plan horloger.",
      href: "/theorie/lecture-de-plan/vues-techniques",
      icon: Layers,
      colorScheme: {
        lightBg: "bg-blue-50",
        lightBorder: "border-blue-200",
        lightIcon: "text-blue-600 dark:text-blue-400",
        lightBadge: "bg-blue-100 text-blue-800 border-blue-300/40",
        darkBadge: "dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800/50",
        gradient: "from-blue-500/10 to-transparent",
      },
    },
    {
      moduleNumber: "Module 02",
      norm: "ISO 128-2",
      title: "Types de Lignes",
      desc: "Identifier avec certitude les lignes de contour continu fort, lignes cachées interrompues, traits mixtes d'axe et plans de coupe.",
      href: "/theorie/lecture-de-plan/types-lignes",
      icon: LineChart,
      colorScheme: {
        lightBg: "bg-emerald-50",
        lightBorder: "border-emerald-200",
        lightIcon: "text-emerald-600 dark:text-emerald-400",
        lightBadge: "bg-emerald-100 text-emerald-800 border-emerald-300/40",
        darkBadge: "dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800/50",
        gradient: "from-emerald-500/10 to-transparent",
      },
    },
    {
      moduleNumber: "Module 03",
      norm: "ISO 129-1 & 1101",
      title: "Cotes et Tolérances",
      desc: "Cotation dimensionnelle ISO 129-1 et tolérancement géométrique GPS ISO 1101 (12 tolérances, ajustements micrométriques, quiz 15 Q).",
      href: "/theorie/lecture-de-plan/cotes-tolerances",
      isKey: true,
      icon: Ruler,
      colorScheme: {
        lightBg: "bg-amber-50",
        lightBorder: "border-amber-300",
        lightIcon: "text-amber-700 dark:text-amber-400",
        lightBadge: "bg-amber-100 text-amber-800 border-amber-300/40",
        darkBadge: "dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800/50",
        gradient: "from-amber-500/15 to-transparent",
      },
    },
    {
      moduleNumber: "Module 04",
      norm: "ISO 1302 & 13715",
      title: "Symboles Normalisés",
      desc: "Indication des états de surface, rugosité Ra, chanfreins horlogers, adoucissages et spécification des arêtes de forme.",
      href: "/theorie/lecture-de-plan/symboles-normalises",
      icon: Grid,
      colorScheme: {
        lightBg: "bg-purple-50",
        lightBorder: "border-purple-200",
        lightIcon: "text-purple-600 dark:text-purple-400",
        lightBadge: "bg-purple-100 text-purple-800 border-purple-300/40",
        darkBadge: "dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800/50",
        gradient: "from-purple-500/10 to-transparent",
      },
    },
    {
      moduleNumber: "Module 05",
      norm: "NIHS 7200 / 7201",
      title: "Cartouche Horloger",
      desc: "Analyse complète du bloc de titre selon les normes suisses : titre, échelle de reproduction, nuances d'alliages, tolérances générales et indices de révision.",
      href: "/theorie/lecture-de-plan/cartouche-horloger",
      icon: FileText,
      colorScheme: {
        lightBg: "bg-amber-50",
        lightBorder: "border-amber-200",
        lightIcon: "text-amber-700 dark:text-amber-400",
        lightBadge: "bg-amber-100 text-amber-800 border-amber-300/40",
        darkBadge: "dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800/50",
        gradient: "from-amber-500/10 to-transparent",
      },
    },
    {
      moduleNumber: "Module 06",
      norm: "Standards NIHS",
      title: "Éléments d'Horlogerie",
      desc: "Représentation normalisée des composants horlogers fondamentaux : profils de denture, roues, tigerons, vis horlogères et assemblages.",
      href: "/theorie/lecture-de-plan/elements-horlogerie",
      icon: Cog,
      colorScheme: {
        lightBg: "bg-rose-50",
        lightBorder: "border-rose-200",
        lightIcon: "text-rose-600 dark:text-rose-400",
        lightBadge: "bg-rose-100 text-rose-800 border-rose-300/40",
        darkBadge: "dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800/50",
        gradient: "from-rose-500/10 to-transparent",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* ESPACE DE DÉGAGEMENT HAUT : Empêche toute superposition sous la navbar capsule flottante */}
      <div className="pt-8 sm:pt-10 md:pt-12" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        {/* HERO SECTION DE HAUTE HORLOGERIE */}
        <section className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-4 flex-wrap">
            <Link
              href="/theorie"
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Théorie
            </Link>
            <span>›</span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold">
              Lecture de Plan Horloger
            </span>
          </nav>

          {/* Badge Horlogerie Suisse */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 mb-5 shadow-sm max-w-full">
            <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="truncate">Normes Officielles ISO & NIHS • Formation Horlogère Suisse CFC & AFP</span>
          </div>

          {/* Grand Titre */}
          <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 font-serif px-2">
            Lecture de Plan Horloger
          </h1>

          {/* Sous-titre */}
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            Découvrez les principes fondamentaux de la lecture et de l&apos;interprétation des plans techniques selon les normes{" "}
            <span className="font-semibold text-slate-900 dark:text-amber-300">ISO</span> et{" "}
            <span className="font-semibold text-slate-900 dark:text-amber-300">NIHS</span>. Chaque fiche est interactive et adaptée au cursus horloger suisse.
          </p>

          {/* Ruban de Métriques Rapides */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">6</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Modules Fondamentaux</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">10+</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Normes ISO & NIHS</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">100%</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Interactions & Quiz</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">CFC</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Conforme Plan d&apos;Études</div>
            </div>
          </div>
        </section>

        {/* GRILLE DES 6 MODULES DE FORMATION HAUTE HORLOGERIE */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Programme des Modules de Cotation & Dessin
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Sélectionnez un module pour explorer ses règles, exemples d&apos;atelier et quiz de validation.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/50 px-3 py-1.5 rounded-xl">
              <span>●</span> 6 Chapitres Disponibles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((item) => {
              const IconComp = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`group relative rounded-2xl p-6 bg-white dark:bg-slate-900 border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    item.isKey
                      ? "border-2 border-amber-500/40 dark:border-amber-500/40 hover:border-amber-500 dark:hover:border-amber-400 hover:shadow-xl ring-1 ring-amber-500/20"
                      : "border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500/50 hover:shadow-xl"
                  }`}
                >
                  {/* Accent Gradient discret au coin supérieur */}
                  <div
                    className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${item.colorScheme.gradient} rounded-bl-3xl pointer-events-none`}
                  />

                  <div>
                    {/* Header de carte : Icône + Norme */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl ${item.colorScheme.lightBg} dark:bg-slate-800 border ${item.colorScheme.lightBorder} dark:border-slate-700 flex items-center justify-center ${item.colorScheme.lightIcon} shadow-sm group-hover:scale-105 transition-transform`}
                      >
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold font-mono border ${item.colorScheme.lightBadge} ${item.colorScheme.darkBadge}`}
                      >
                        {item.norm}
                      </span>
                    </div>

                    {/* Numéro de module + Badge Pilier si clé */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                        {item.moduleNumber}
                      </span>
                      {item.isKey && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950">
                          Pilier Clé
                        </span>
                      )}
                    </div>

                    {/* Titre & Description */}
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>

                  {/* Footer de carte : Lien avec flèche animée */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                    <span>Explorer le module</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* GUIDE PRATIQUE D'ATELIER : LES 4 ÉTAPES DE DÉCODAGE D'UN PLAN */}
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
              Méthode d&apos;Atelier Suisse
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              La Démarche d&apos;Excellence en 4 Étapes
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              Comment les horlogers chevronnés abordent systématiquement un nouveau plan technique.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950 flex items-center justify-center font-bold text-sm mb-3">
                1
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Cartouche & Échelle</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Identifier le nom de la pièce, son numéro de plan, l&apos;échelle (ex: 20:1), la matière (ex: Maillechort) et les tolérances générales.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950 flex items-center justify-center font-bold text-sm mb-3">
                2
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Géométrie & Vues</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Analyser la disposition des projections, les coupes partielles et repérer les formes intérieures (noyures, alésages, taraudages).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950 flex items-center justify-center font-bold text-sm mb-3">
                3
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Cotes & Tolérances</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Repérer les cotes fonctionnelles au micron, les tolérances géométriques (rectitude, planéité) et les ajustements de pivotement.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950 flex items-center justify-center font-bold text-sm mb-3">
                4
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Finitions & Rugosité</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Vérifier les symboles d&apos;états de surface (adoucissage, poli miroir, chanfreinage) requis avant l&apos;assemblage et le réglage final.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER CITATION OFFICIELLE */}
        <div className="text-center pt-8 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <p className="font-semibold text-slate-700 dark:text-slate-300">
            © HorloLearn Suisse • Normes ISO (Organisation Internationale de Normalisation) & NIHS (Normes de l&apos;Industrie Horlogère Suisse).
          </p>
          <p className="mt-1">
            Ces modules pédagogiques sont rigoureusement alignés sur les exigences des examens pratiques et théoriques du CFC Horloger.
          </p>
        </div>

      </main>
    </div>
  );
}
