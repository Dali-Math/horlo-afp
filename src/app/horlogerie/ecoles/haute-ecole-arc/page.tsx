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

export default function HauteEcoleArc() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-200 transition-colors">
      <section className="max-w-4xl mx-auto px-6 py-16">
        <BackLink />
        <h1 className="mt-6 text-3xl md:text-5xl font-bold text-amber-600 dark:text-amber-400">
          Haute École Arc – Ingénierie
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-2">
          <strong>Canton :</strong> Neuchâtel – <strong>Villes :</strong> Le Locle & Neuchâtel
        </p>

        <Image
          src="/images/ecoles/haute-ecole-arc.webp"
          alt="Haute École Arc Ingénierie"
          width={900}
          height={500}
          className="rounded-xl border border-neutral-300 dark:border-neutral-700 my-8"
        />

        <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-2">Historique</h2>
        <p className="mb-6 leading-relaxed text-neutral-700 dark:text-neutral-300">
          Née de la fusion des écoles techniques de Neuchâtel et du Locle, la Haute École Arc-Ingénierie incarne
          la tradition et l’excellence de la microtechnique suisse. Elle a su s’imposer comme une référence en
          matière de formation supérieure dans les domaines de la mécanique de précision, de l’horlogerie et de
          la conception industrielle.
        </p>

        <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-2">Description actuelle</h2>
        <p className="mb-6 leading-relaxed text-neutral-700 dark:text-neutral-300">
          La HE-Arc forme des ingénieurs spécialisés en microtechnique, en conception horlogère et en technologies
          industrielles. Les programmes allient théorie, pratique et innovation, avec un fort ancrage dans le tissu
          industriel régional. L’établissement est reconnu pour sa proximité avec les entreprises horlogères suisses.
        </p>

        <p>
          🔗{' '}
          <a
            href="https://www.he-arc.ch/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-500 hover:text-amber-400 underline"
          >
            Site officiel de la Haute École Arc
          </a>
        </p>
      </section>
    </main>
  )
}
