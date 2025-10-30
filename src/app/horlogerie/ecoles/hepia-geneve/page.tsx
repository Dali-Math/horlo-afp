'use client'

import Image from 'next/image'
import Link from 'next/link'

function BackLink() {
  return (
    <Link
      href="/horlogerie/ecoles"
      className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 transition-colors"
    >
      <span>←</span>
      <span>Retour à la liste</span>
    </Link>
  )
}

export default function HepiaGeneve() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 transition-colors">
      <section className="max-w-4xl mx-auto px-6 py-16">
        {/* Lien de retour */}
        <BackLink />

        <h1 className="mt-6 text-3xl md:text-5xl font-bold mb-6 text-amber-600 dark:text-amber-400">
          HEPIA – Haute École du Paysage, d’Ingénierie et d’Architecture de Genève
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-2">
          <strong>Canton :</strong> Genève – <strong>Ville :</strong> Genève
        </p>

        <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-700 my-8">
          <Image
            src="/images/ecoles/hepia-geneve.webp"
            alt="HEPIA Genève – Haute École du Paysage, d’Ingénierie et d’Architecture"
            fill
            className="object-cover"
          />
        </div>

        <section className="space-y-8 text-lg leading-relaxed">
          <div>
            <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
              Histoire
            </h2>
            <p>
              L’<strong>HEPIA</strong> (Haute École du Paysage, d’Ingénierie et d’Architecture de Genève)
              a été fondée en <strong>2009</strong> à la suite de la fusion entre l’École d’Ingénieurs de Genève
              et l’École d’Horticulture. Bien qu’elle ne soit pas une école d’horlogerie au sens strict,
              elle occupe une place importante dans la <strong>formation en microtechnique et ingénierie de précision</strong>,
              piliers essentiels du savoir-faire horloger suisse.
            </p>
            <p className="mt-3">
              Grâce à ses laboratoires et collaborations avec des entreprises du canton de Genève,
              HEPIA participe à la recherche appliquée dans les domaines liés à la micromécanique,
              aux matériaux et à la conception de composants horlogers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
              Description actuelle
            </h2>
            <p>
              L’école propose un <strong>Bachelor en ingénierie microtechnique</strong> reconnu à l’échelle nationale,
              couvrant la conception, la fabrication et l’analyse de systèmes mécaniques de haute précision.
              De nombreux diplômés d’HEPIA poursuivent leur carrière dans les laboratoires R&D
              des grandes manufactures horlogères genevoises.
            </p>
            <p className="mt-3">
              Le campus, situé au cœur de Genève, offre un environnement multidisciplinaire stimulant
              où se rencontrent ingénierie, design et innovation technologique, 
              dans l’esprit de la tradition suisse du travail bien fait.
            </p>
          </div>
        </section>

        <div className="mt-10 border-t border-neutral-300 dark:border-neutral-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              📍 <strong>Adresse :</strong> Rue de la Prairie 4, 1202 Genève, Suisse
            </p>
          </div>

          <Link
            href="https://www.hesge.ch/hepia/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            Visiter le site officiel
          </Link>
        </div>
      </section>
    </main>
  )
}
