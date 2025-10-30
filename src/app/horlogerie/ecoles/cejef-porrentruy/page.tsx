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

export default function CejefPorrentruy() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-200 transition-colors">
      <section className="max-w-4xl mx-auto px-6 py-16">
        <BackLink />
        <h1 className="mt-6 text-3xl md:text-5xl font-bold text-amber-600 dark:text-amber-400">
          CEJEF – Division Technique – Porrentruy
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-2">
          <strong>Canton :</strong> Jura – <strong>Ville :</strong> Porrentruy
        </p>

        <Image
          src="/images/ecoles/cejef-porrentruy.webp"
          alt="CEJEF Division Technique Porrentruy"
          width={900}
          height={500}
          className="rounded-xl border border-neutral-300 dark:border-neutral-700 my-8"
        />

        <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-2">Historique</h2>
        <p className="mb-6 leading-relaxed text-neutral-700 dark:text-neutral-300">
          Le CEJEF (Centre d’Enseignement et de Formation Professionnelle) du canton du Jura regroupe plusieurs
          divisions professionnelles, dont la Division Technique à Porrentruy, qui perpétue la tradition horlogère
          jurassienne depuis des décennies.
        </p>

        <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-2">Description actuelle</h2>
        <p className="mb-6 leading-relaxed text-neutral-700 dark:text-neutral-300">
          L’école offre des formations de base et continues dans les métiers techniques et horlogers. Elle prépare
          aux diplômes fédéraux et propose un environnement moderne et tourné vers la pratique, au cœur d’une
          région historiquement liée à l’horlogerie suisse.
        </p>

        <p>
          🔗{' '}
          <a
            href="https://www.cejef.ch/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-500 hover:text-amber-400 underline"
          >
            Site officiel du CEJEF
          </a>
        </p>
      </section>
    </main>
  )
}
