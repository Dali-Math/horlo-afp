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

export default function ZeitzentrumGranges() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-200 transition-colors">
      <section className="max-w-4xl mx-auto px-6 py-16">
        <BackLink />
        <h1 className="mt-6 text-3xl md:text-5xl font-bold text-amber-600 dark:text-amber-400">
          ZeitZentrum – Uhrmacherschule Grenchen
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-2">
          <strong>Canton :</strong> Soleure – <strong>Ville :</strong> Granges
        </p>

        <Image
          src="/images/ecoles/zeitzentrum.webp"
          alt="ZeitZentrum Uhrmacherschule Grenchen"
          width={900}
          height={500}
          className="rounded-xl border border-neutral-300 dark:border-neutral-700 my-8"
        />

        <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-2">Historique</h2>
        <p className="mb-6 leading-relaxed text-neutral-700 dark:text-neutral-300">
          Fondée à Granges, au cœur du canton de Soleure, l’école ZeitZentrum perpétue la tradition de la formation
          horlogère suisse. Elle est l’un des établissements les plus réputés pour l’enseignement des métiers liés à
          la fabrication et à la maintenance des montres mécaniques.
        </p>

        <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-2">Description actuelle</h2>
        <p className="mb-6 leading-relaxed text-neutral-700 dark:text-neutral-300">
          L’école propose un apprentissage complet des techniques horlogères, du démontage aux réglages fins, en
          passant par l’assemblage et la finition. ZeitZentrum met l’accent sur la précision, la pratique et la
          transmission du savoir-faire traditionnel adapté aux standards modernes de l’industrie.
        </p>

        <p>
          🔗{' '}
          <a
            href="https://bbzsogr.so.ch/zeitzentrum-gr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-500 hover:text-amber-400 underline"
          >
            Site officiel du ZeitZentrum Grenchen
          </a>
        </p>
      </section>
    </main>
  )
}
