'use client'

import Image from 'next/image'
import Link from 'next/link'

function BackLink() {
  return (
    <Link
      href="/horlogerie/ecoles"
      className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors"
    >
      ← Retour à la liste
    </Link>
  )
}

export default function CeffStImier() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-200 transition-colors">
      <section className="max-w-4xl mx-auto px-6 py-16">
        <BackLink />

        <h1 className="mt-6 text-3xl md:text-5xl font-bold text-amber-600 dark:text-amber-400">
          CEFF – Centre de Formation Professionnelle Berne Francophone
        </h1>

        <p className="text-neutral-600 dark:text-neutral-400 mb-2">
          <strong>Canton :</strong> Berne – <strong>Ville :</strong> Saint-Imier
        </p>

        <Image
          src="/images/ecoles/ceff-st-imier.webp"
          alt="CEFF Saint-Imier"
          width={900}
          height={500}
          className="rounded-xl border border-neutral-300 dark:border-neutral-700 my-8"
        />

        <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-2">Historique</h2>
        <p className="mb-6 leading-relaxed text-neutral-700 dark:text-neutral-300">
          Situé à Saint-Imier, le CEFF (Centre de Formation Professionnelle Berne Francophone) est un acteur majeur
          de la formation horlogère et microtechnique dans le Jura bernois. Il perpétue une tradition d’excellence
          ancrée dans la région, berceau historique de l’horlogerie suisse.
        </p>

        <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-2">Description actuelle</h2>
        <p className="mb-6 leading-relaxed text-neutral-700 dark:text-neutral-300">
          Le CEFF propose plusieurs formations dans les métiers de l’horlogerie, de la micromécanique et du
          design industriel. Les ateliers sont modernes et favorisent la mise en pratique directe des compétences,
          en lien étroit avec les manufactures suisses de renom.
        </p>

        <p>
          🔗{' '}
          <a
            href="https://www.ceff.ch/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-500 hover:text-amber-400 underline"
          >
            Site officiel du CEFF Saint-Imier
          </a>
        </p>
      </section>
    </main>
  )
}
