'use client';

import React from 'react';
import Link from 'next/link';
import {
  Clock, Gauge, Zap, Settings2, ChevronLeft, BookOpen, Cog, RotateCw, Book,
  Building2, Watch, Cpu, Wrench, Boxes
} from 'lucide-react';

const pagesFonctionnement = [
  {
    slug: 'introduction-montre-mecanique',
    titre: "Introduction à la montre mécanique",
    description: "Fonctionnement général, grands organes, bases.",
    icon: <Clock className="w-7 h-7 text-blue-600 dark:text-blue-400" />,
  },
  {
    slug: 'barillet-ressort-moteur',
    titre: "Le Barillet et Ressort Moteur",
    description: "Source d'énergie mécanique et réserve de marche.",
    icon: <Gauge className="w-7 h-7 text-yellow-600 dark:text-yellow-300" />,
  },
  {
    slug: 'rouage',
    titre: "Le Rouage (Train d'engrenages)",
    description: "Transmission de l'énergie, calculs et rapports.",
    icon: <Cog className="w-7 h-7 text-blue-600 dark:text-blue-400" />,
  },
  {
    slug: 'echappement-ancre',
    titre: "L'Échappement à Ancre Suisse",
    description: "Organe de distribution - rôle, éléments, phases.",
    icon: <Zap className="w-7 h-7 text-purple-600 dark:text-purple-300" />,
  },
  {
    slug: 'balancier-spiral',
    titre: "Le Balancier-Spiral",
    description: "Organe réglant, oscillations, réglage, matériaux.",
    icon: <Settings2 className="w-7 h-7 text-green-600 dark:text-green-300" />,
  },
  {
    slug: 'remontage',
    titre: "Le Remontage",
    description: "Manuel et automatique, procédure et réserve de marche.",
    icon: <RotateCw className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />,
  },
];
// 🧱 Nouvelle section — Matériaux Horlogers
const pagesMateriaux = [
  {
    slug: '/materiaux',
    titre: "Matériaux en Horlogerie Suisse",
    description: "Métaux, alliages, céramiques et matériaux modernes utilisés dans les montres suisses.",
    icon: <Gem className="w-7 h-7 text-yellow-500 dark:text-yellow-400" />,
  },
];
// ⭐ UNE SEULE CARTE POUR "MOUVEMENT" ⭐
const pagesMouvement = [
  {
    slug: 'mouvements',
    titre: "Architecture du Mouvement",
    description: "Vue d'ensemble : platine, ponts, fixation et décoration.",
    icon: <Boxes className="w-7 h-7 text-slate-600 dark:text-slate-300" />,
  },
];

const pagesHistoireCulture = [
  {
    slug: 'histoire-horlogerie-suisse',
    titre: "Histoire de l'Horlogerie Suisse",
    description: "Origines, établissage, crises et succès depuis le 16ème siècle.",
    icon: <Book className="w-7 h-7 text-amber-600 dark:text-amber-400" />,
  },
];

const pagesManufactures = [
  {
    slug: 'manufactures',
    titre: "Grandes Manufactures Suisses",
    description: "Patek Philippe, Rolex, Audemars Piguet, Vacheron Constantin, Omega - Histoire et innovations.",
    icon: <Building2 className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />,
  },
];

const pagesComplications = [
  {
    slug: 'complications',
    titre: "Complications Horlogères",
    description: "Quantième, Chronographe, Phases de Lune, Tourbillon - Mécanismes d'exception.",
    icon: <Watch className="w-7 h-7 text-purple-600 dark:text-purple-400" />,
  },
];

const pagesTechnologies = [
  {
    slug: 'technologies',
    titre: "Technologies Modernes",
    description: "Mouvements à quartz, montres connectées, matériaux innovants (silicium, céramique).",
    icon: <Cpu className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />,
  },
];

const pagesEntretien = [
  {
    slug: 'entretien',
    titre: "Entretien & Maintenance",
    description: "Révision complète, diagnostic de pannes, réparations professionnelles.",
    icon: <Wrench className="w-7 h-7 text-orange-600 dark:text-orange-400" />,
  },
];

const pagesLecturePlan = [
  {
    slug: 'lecture-de-plan',
    titre: "Lecture de Plans Horlogers",
    description: "Vues techniques, cartouche, tolérances, ISO/NIHS.",
    icon: <BookOpen className="w-7 h-7 text-slate-700 dark:text-slate-200" />,
  },
];

export default function TheoriePage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* HEADER */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à l'accueil
          </Link>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
          Théorie Horlogère Suisse
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mb-8">
          Parcours complet de l'horlogerie suisse : mécanique, manufactures, complications, 
          technologies modernes et maintenance professionnelle.
        </p>

        {/* Section fonctionnement horloger */}
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3 mt-12">
          ⚙️ Fonctionnement d'une montre mécanique
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {pagesFonctionnement.map((p) => (
            <Link
              key={p.slug}
              href={`/theorie/${p.slug}`}
              className="flex gap-4 items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all group"
            >
              <div>{p.icon}</div>
              <div>
                <div className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {p.titre}
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300">{p.description}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* ⭐ SECTION MOUVEMENT - UNE SEULE CARTE ⭐ */}
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-3 mt-12">
          🏗️ Architecture du Mouvement
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {pagesMouvement.map((p) => (
            <Link
              key={p.slug}
              href={`/theorie/${p.slug}`}
              className="flex gap-4 items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all group"
            >
              <div>{p.icon}</div>
              <div>
                <div className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                  {p.titre}
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300">{p.description}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Section Manufactures */}
        <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-3 mt-12">
          🏛️ Grandes Manufactures Suisses
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {pagesManufactures.map((p) => (
            <Link
              key={p.slug}
              href={`/theorie/${p.slug}`}
              className="flex gap-4 items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all group"
            >
              <div>{p.icon}</div>
              <div>
                <div className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {p.titre}
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300">{p.description}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Section Complications */}
        <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-3 mt-12">
          🌀 Complications Horlogères
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {pagesComplications.map((p) => (
            <Link
              key={p.slug}
              href={`/theorie/${p.slug}`}
              className="flex gap-4 items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all group"
            >
              <div>{p.icon}</div>
              <div>
                <div className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {p.titre}
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300">{p.description}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Section Technologies Modernes */}
        <h2 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-3 mt-12">
          🔬 Technologies Modernes
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {pagesTechnologies.map((p) => (
            <Link
              key={p.slug}
              href={`/theorie/${p.slug}`}
              className="flex gap-4 items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all group"
            >
              <div>{p.icon}</div>
              <div>
                <div className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {p.titre}
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300">{p.description}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Section Entretien & Maintenance */}
        <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-3 mt-12">
          🔧 Entretien & Maintenance
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {pagesEntretien.map((p) => (
            <Link
              key={p.slug}
              href={`/theorie/${p.slug}`}
              className="flex gap-4 items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all group"
            >
              <div>{p.icon}</div>
              <div>
                <div className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {p.titre}
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300">{p.description}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Section Histoire et Culture */}
        <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-3 mt-12">
          📚 Histoire et Culture Horlogère
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {pagesHistoireCulture.map((p) => (
            <Link
              key={p.slug}
              href={`/theorie/${p.slug}`}
              className="flex gap-4 items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all group"
            >
              <div>{p.icon}</div>
              <div>
                <div className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {p.titre}
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300">{p.description}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Section lecture de plans */}
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-300 mb-3">
          📐 Lecture de plans, normes & cartouches
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {pagesLecturePlan.map((p) => (
            <Link
              key={p.slug}
              href={`/theorie/${p.slug}`}
              className="flex gap-4 items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all group"
            >
              <div>{p.icon}</div>
              <div>
                <div className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {p.titre}
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300">{p.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
