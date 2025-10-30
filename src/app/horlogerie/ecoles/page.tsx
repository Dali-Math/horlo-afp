'use client'

import Link from 'next/link'

export default function EcolesHorlogerie() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-200 transition-colors">
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-amber-600 dark:text-amber-400">
          Écoles d’Horlogerie et de Microtechnique en Suisse
        </h1>

        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-12 leading-relaxed">
          Découvrez les principales écoles suisses d’horlogerie et de microtechnique, où se transmet la rigueur,
          la précision et l’esprit d’excellence du savoir-faire helvétique. Ces établissements forment les artisans
          du temps de demain, entre tradition et innovation.
        </p>

        {/* --- Genève --- */}
        <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mt-10 mb-4">Genève</h2>
        <ul className="space-y-2 border-b border-neutral-300 dark:border-neutral-700 pb-4">
          <li>
            <Link href="/horlogerie/ecoles/cfpt-geneve" className="hover:text-amber-400 transition-colors">
              CFPT – École d’Horlogerie de Genève – Plan-les-Ouates
            </Link>
          </li>
          <li>
            <Link href="/horlogerie/ecoles/ifage-geneve" className="hover:text-amber-400 transition-colors">
              Ifage – Fondation pour la Formation des Adultes – Genève
            </Link>
          </li>
          <li>
            <Link href="/horlogerie/ecoles/cfp-arts-geneve" className="hover:text-amber-400 transition-colors">
              CFP Arts – Centre de Formation Professionnelle – Genève
            </Link>
          </li>
          <li>
            <Link href="/horlogerie/ecoles/hepia-geneve" className="hover:text-amber-400 transition-colors">
              HEPIA – Haute École du Paysage, d’Ingénierie et d’Architecture – Genève
            </Link>
          </li>
        </ul>

        {/* --- Vaud --- */}
        <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mt-10 mb-4">Vaud</h2>
        <ul className="space-y-2 border-b border-neutral-300 dark:border-neutral-700 pb-4">
          <li>
            <Link href="/horlogerie/ecoles/etvj-sentier" className="hover:text-amber-400 transition-colors">
              ETVJ – École Technique de la Vallée de Joux – Le Sentier
            </Link>
          </li>
          <li>
            <Link href="/horlogerie/ecoles/heig-yd" className="hover:text-amber-400 transition-colors">
              HEIG-VD – Haute École d’Ingénierie et de Gestion du canton de Vaud – Yverdon-les-Bains
            </Link>
          </li>
        </ul>

        {/* --- Neuchâtel --- */}
        <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mt-10 mb-4">Neuchâtel</h2>
        <ul className="space-y-2 border-b border-neutral-300 dark:border-neutral-700 pb-4">
          <li>
            <Link href="/horlogerie/ecoles/cpne-locle" className="hover:text-amber-400 transition-colors">
              CPNE – Centre de Formation Professionnelle Neuchâtelois – Le Locle
            </Link>
          </li>
          <li>
            <Link href="/horlogerie/ecoles/cpne-aa-chauxdefonds" className="hover:text-amber-400 transition-colors">
              CPNE AA – Pôle Arts Appliqués – La Chaux-de-Fonds
            </Link>
          </li>
          <li>
            <Link href="/horlogerie/ecoles/haute-ecole-arc" className="hover:text-amber-400 transition-colors">
              Haute École Arc-Ingénierie – Le Locle & Neuchâtel
            </Link>
          </li>
          <li>
            <Link href="/horlogerie/ecoles/wostep-neuchatel" className="hover:text-amber-400 transition-colors">
              Fondation WOSTEP – Neuchâtel
            </Link>
          </li>
        </ul>

        {/* --- Jura --- */}
        <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mt-10 mb-4">Jura</h2>
        <ul className="space-y-2 border-b border-neutral-300 dark:border-neutral-700 pb-4">
          <li>
            <Link href="/horlogerie/ecoles/cejef-porrentruy" className="hover:text-amber-400 transition-colors">
              CEJEF – Division Technique – Porrentruy
            </Link>
          </li>
        </ul>

        {/* --- Berne --- */}
        <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mt-10 mb-4">Berne</h2>
        <ul className="space-y-2 border-b border-neutral-300 dark:border-neutral-700 pb-4">
          <li>
            <Link href="/horlogerie/ecoles/lycee-technique-bienne" className="hover:text-amber-400 transition-colors">
              Lycée Technique de Bienne (CFP) – Bienne
            </Link>
          </li>
          <li>
            <Link href="/horlogerie/ecoles/ceff-st-imier" className="hover:text-amber-400 transition-colors">
              CEFF – Centre de Formation Professionnelle Berne Francophone – Saint-Imier
            </Link>
          </li>
        </ul>

        {/* --- Soleure --- */}
        <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mt-10 mb-4">Soleure</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/horlogerie/ecoles/zeitzentrum-granges" className="hover:text-amber-400 transition-colors">
              ZeitZentrum – Uhrmacherschule Grenchen – Granges
            </Link>
          </li>
        </ul>
      </section>
    </main>
  )
}
