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

export default function WostepNeuchatel() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-200 transition-colors">
      <section className="max-w-4xl mx-auto px-6 py-16">
        <BackLink />
        <h1 className="mt-6 text-3xl md:text-5xl font-bold text-amber-600 dark:text-amber-400">
          Fondation WOSTEP – Neuchâtel
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-2">
          <strong>Canton :</strong> Neuchâtel – <strong>Ville :</strong> Neuchâtel
        </p>

        <Image
          src="/images/ecoles/wostep.webp"
          alt="Fondation WOSTEP Neuchâtel"
          width={900}
          height={500}
          className="rounded-xl border border-neutral-300 dark:border-neutral-700 my-8"
        />

        <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-2">Historique</h2>
        <p className="mb-6 leading-relaxed text-neutral-700 dark:text-neutral-300">
          Fondée en 1966, la Fondation WOSTEP (Watchmakers of Switzerland Training and Educational Program) a
          été créée pour assurer une formation horlogère d’excellence à l’échelle internationale. Son influence
          s’étend dans le monde entier, grâce à son programme reconnu dans plus de 30 pays.
        </p>

        <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-2">Description actuelle</h2>
        <p className="mb-6 leading-relaxed text-neutral-700 dark:text-neutral-300">
          Située à Neuchâtel, la WOSTEP forme des horlogers hautement qualifiés aux techniques de service,
          de restauration et de réglage des montres mécaniques suisses. L’école collabore avec les plus grandes
          manufactures horlogères et reste une référence mondiale en matière de standards horlogers suisses.
        </p>

        <p>
          🔗{' '}
          <a
            href="https://www.wostep.ch/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-500 hover:text-amber-400 underline"
          >
            Site officiel de la Fondation WOSTEP
          </a>
        </p>
      </section>
    </main>
  )
}
