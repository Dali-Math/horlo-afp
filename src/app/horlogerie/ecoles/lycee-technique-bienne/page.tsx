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

export default function LyceeTechniqueBienne() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-200 transition-colors">
      <section className="max-w-4xl mx-auto px-6 py-16">
        <BackLink />

        <h1 className="mt-6 text-3xl md:text-5xl font-bold text-amber-600 dark:text-amber-400">
          Lycée Technique de Bienne (CFP)
        </h1>

        <p className="text-neutral-600 dark:text-neutral-400 mb-2">
          <strong>Canton :</strong> Berne – <strong>Ville :</strong> Bienne
        </p>

        <Image
          src="/images/ecoles/lycee-technique-bienne.webp"
          alt="Lycée Technique de Bienne"
          width={900}
          height={500}
          className="rounded-xl border border-neutral-300 dark:border-neutral-700 my-8"
        />

        <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-2">Historique</h2>
        <p className="mb-6 leading-relaxed text-neutral-700 dark:text-neutral-300">
          Le Lycée Technique de Bienne est l’un des plus anciens établissements techniques de Suisse.
          Fondé pour soutenir l’industrie horlogère bernoise, il a formé depuis plus d’un siècle des générations
          d’horlogers, de microtechniciens et d’ingénieurs hautement qualifiés.
        </p>

        <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-2">Description actuelle</h2>
        <p className="mb-6 leading-relaxed text-neutral-700 dark:text-neutral-300">
          L’école propose des formations professionnelles et continues dans les domaines de la microtechnique,
          de la mécanique de précision et de l’horlogerie. Son enseignement repose sur une approche à la fois
          scientifique et artisanale, en lien direct avec les entreprises de la région biennoise.
        </p>

        <p>
          🔗{' '}
          <a
            href="https://www.cfp-bienne.ch/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-500 hover:text-amber-400 underline"
          >
            Site officiel du Lycée Technique de Bienne
          </a>
        </p>
      </section>
    </main>
  )
}
