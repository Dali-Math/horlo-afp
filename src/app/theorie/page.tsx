'use client'

import Link from 'next/link'

type PageItem = {
  slug: string
  icon: string
  titre: string
  description: string
}

export default function TheoriePage() {
  // — Fonctionnement d'une montre mécanique —
  const pagesFonctionnement: PageItem[] = [
    {
      slug: 'introduction-montre-mecanique',
      icon: '🕰️',
      titre: 'Introduction à la montre mécanique',
      description: "Fonctionnement général, grands organes, bases.",
    },
    {
      slug: 'barillet-ressort-moteur',
      icon: '⚡',
      titre: 'Le Barillet et Ressort Moteur',
      description: "Source d'énergie mécanique et réserve de marche.",
    },
    {
      slug: 'rouage-train-engrenages',
      icon: '⚙️',
      titre: "Le Rouage (Train d'engrenages)",
      description: "Transmission de l'énergie, calculs et rapports.",
    },
    {
      slug: 'echappement-ancre-suisse',
      icon: '⛓️',
      titre: "L'Échappement à Ancre Suisse",
      description: 'Organe de distribution — rôle, éléments, phases.',
    },
    {
      slug: 'balancier-spiral',
      icon: '🔄',
      titre: 'Le Balancier-Spiral',
      description: 'Organe réglant, oscillations, réglage, matériaux.',
    },
    {
      slug: 'remontage',
      icon: '🧭',
      titre: 'Le Remontage',
      description: 'Manuel et automatique, procédure et réserve de marche.',
    },
  ]

  // — Entretien & Maintenance —
  const pagesEntretien: PageItem[] = [
    {
      slug: 'entretien',
      icon: '🧰',
      titre: 'Entretien & Révision',
      description: 'Procédures, nettoyage, lubrification et contrôle.',
    },
    {
      slug: 'reglage',
      icon: '🪛',
      titre: 'Réglage de précision',
      description: 'Méthodes de réglage et contrôle du balancier-spiral.',
    },
  ]

  // — Histoire & Culture —
  const pagesHistoireCulture: PageItem[] = [
    {
      slug: 'origines-horlogerie-suisse',
      icon: '🏛️',
      titre: "Origines de l'Horlogerie Suisse",
      description: 'Des artisans aux manufactures modernes.',
    },
    {
      slug: 'grands-maitres',
      icon: '⌚',
      titre: 'Les Grands Maîtres Horlogers',
      description: 'Figures emblématiques et maisons historiques.',
    },
  ]

  // — Lecture de plans —
  const pagesLecturePlan: PageItem[] = [
    {
      slug: 'lecture-de-plan',
      icon: '📐',
      titre: 'Lecture de plans techniques',
      description: 'Normes ISO, projections et cotations.',
    },
    {
      slug: 'cartouche-technique',
      icon: '📋',
      titre: 'Cartouche technique horlogère',
      description: 'Identification complète des dessins et pièces.',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      <section className="max-w-6xl mx-auto px-6 py-14">
        {/* En-tête */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Théorie Horlogère Suisse
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            Parcours complet de l&apos;horlogerie suisse : mécanique, manufactures,
            complications, technologies modernes et maintenance professionnelle.
          </p>
        </header>

        {/* Section Fonctionnement */}
        <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-3">
          ⚙️ Fonctionnement d&apos;une montre mécanique
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {pagesFonctionnement.map((p) => (
            <Link
              key={p.slug}
              href={`/theorie/${p.slug}`}
              className="flex gap-4 items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all group"
            >
              <div className="text-2xl">{p.icon}</div>
              <div>
                <div className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {p.titre}
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300">{p.description}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* NOUVELLE section : Matériaux */}
        <h2 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-3 mt-12">
          🧱 Matériaux Horlogers
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/materiaux"
            className="flex gap-4 items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all group"
          >
            <div className="text-2xl">🪨</div>
            <div>
              <div className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                Matériaux en Horlogerie Suisse
              </div>
              <div className="text-sm text-slate-700 dark:text-slate-300">
                Métaux, alliages, céramiques et matériaux modernes utilisés dans les montres suisses.
              </div>
            </div>
          </Link>
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
              <div className="text-2xl">{p.icon}</div>
              <div>
                <div className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {p.titre}
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300">{p.description}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Section Histoire & Culture */}
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
              <div className="text-2xl">{p.icon}</div>
              <div>
                <div className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {p.titre}
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300">{p.description}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Section Lecture de plans */}
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
              <div className="text-2xl">{p.icon}</div>
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
  )
}
