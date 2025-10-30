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

export default function EtvjLeSentier() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 transition-colors">
      <section className="max-w-4xl mx-auto px-6 py-16">
        {/* Lien de retour */}
        <BackLink />

        <h1 className="mt-6 text-3xl md:text-5xl font-bold mb-6 text-amber-600 dark:text-amber-400">
          ETVJ – École Technique de la Vallée de Joux
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-2">
          <strong>Canton :</strong> Vaud – <strong>Ville :</strong> Le Sentier
        </p>

        <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-700 my-8">
          <Image
            src="/images/ecoles/etvj-le-sentier.webp"
            alt="École Technique de la Vallée de Joux – Le Sentier"
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
              Fondée en <strong>1901</strong>, l’<strong>École Technique de la Vallée de Joux (ETVJ)</strong> 
              est l’une des institutions les plus prestigieuses de Suisse dans le domaine horloger. 
              Située au cœur du Jura vaudois, berceau historique de grandes manufactures comme 
              Audemars Piguet, Jaeger-LeCoultre et Breguet, elle a accompagné plus d’un siècle 
              d’évolution de la haute horlogerie suisse.
            </p>
            <p className="mt-3">
              L’école a été créée pour répondre à la demande croissante d’ouvriers qualifiés 
              dans une région où la mécanique de précision et l’art du temps se confondent. 
              Son savoir-faire a traversé les générations et formé nombre d’artisans devenus maîtres horlogers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
              Description actuelle
            </h2>
            <p>
              Aujourd’hui, l’ETVJ dispense des formations dans les domaines de l’<strong>horlogerie</strong>, 
              de la <strong>micromécanique</strong> et du <strong>polissage</strong>. 
              Elle prépare notamment aux <strong>CFC d’horloger-praticien</strong> et de <strong>micromécanicien</strong>, 
              tout en proposant des cours de perfectionnement et des certifications professionnelles reconnues.
            </p>
            <p className="mt-3">
              L’école bénéficie d’équipements modernes, d’ateliers connectés aux standards industriels 
              et d’une proximité unique avec les manufactures de la Vallée de Joux, favorisant 
              l’apprentissage en immersion dans la tradition horlogère suisse.
            </p>
          </div>
        </section>

        <div className="mt-10 border-t border-neutral-300 dark:border-neutral-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              📍 <strong>Adresse :</strong> Rue de l’Industrie 29, 1347 Le Sentier, Suisse
            </p>
          </div>

          <Link
            href="https://www.etvj.ch/"
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
