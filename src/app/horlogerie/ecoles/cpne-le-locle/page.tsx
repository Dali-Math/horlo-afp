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

export default function CpneLeLocle() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 transition-colors">
      <section className="max-w-4xl mx-auto px-6 py-16">
        {/* Lien de retour */}
        <BackLink />

        <h1 className="mt-6 text-3xl md:text-5xl font-bold mb-6 text-amber-600 dark:text-amber-400">
          CPNE – Centre de Formation Professionnelle Neuchâtelois
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-2">
          <strong>Canton :</strong> Neuchâtel – <strong>Ville :</strong> Le Locle
        </p>

        <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-700 my-8">
          <Image
            src="/images/ecoles/cpne-le-locle.webp"
            alt="CPNE – Centre de Formation Professionnelle Neuchâtelois – Le Locle"
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
              Le <strong>Centre de Formation Professionnelle Neuchâtelois (CPNE)</strong> 
              du Locle est l’un des établissements emblématiques de la formation horlogère suisse. 
              Héritier d’une tradition datant du XIXᵉ siècle, il perpétue le savoir-faire technique 
              d’une région considérée comme le berceau de l’horlogerie helvétique.
            </p>
            <p className="mt-3">
              Situé dans la ville du <strong>Locle</strong>, haut lieu historique de l’industrie du temps 
              (inscrite au patrimoine mondial de l’UNESCO), le CPNE a formé des générations d’horlogers, 
              de micromécaniciens et de techniciens de précision, tout en évoluant avec les technologies modernes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
              Description actuelle
            </h2>
            <p>
              Le CPNE propose aujourd’hui une large gamme de formations, du 
              <strong> CFC d’horloger-praticien</strong> au 
              <strong> diplôme de technicien ES en microtechnique</strong>. 
              Les cours sont dispensés dans des ateliers équipés selon les standards 
              des grandes manufactures suisses.
            </p>
            <p className="mt-3">
              L’école collabore activement avec des marques comme Tissot, Ulysse Nardin et Zenith, 
              offrant aux étudiants une immersion dans le monde professionnel dès leur apprentissage. 
              Elle est reconnue comme un centre de référence en matière d’innovation horlogère et de précision.
            </p>
          </div>
        </section>

        <div className="mt-10 border-t border-neutral-300 dark:border-neutral-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              📍 <strong>Adresse :</strong> Rue Daniel-Jeanrichard 47, 2400 Le Locle, Suisse
            </p>
          </div>

          <Link
            href="https://www.cpne.ch/"
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
