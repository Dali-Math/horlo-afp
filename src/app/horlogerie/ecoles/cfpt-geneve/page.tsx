'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function CfptGeneve() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 transition-colors">
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-amber-600 dark:text-amber-400">
          CFPT – École d’Horlogerie de Genève
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-2">
          <strong>Canton :</strong> Genève – <strong>Ville :</strong> Plan-les-Ouates
        </p>

        <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-700 my-8">
          <Image
            src="/images/ecoles/cfpt-geneve.webp"
            alt="CFPT École d’Horlogerie de Genève"
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
              Fondée en <strong>1946</strong>, l’École d’Horlogerie de Genève s’inscrit dans la longue
              tradition de formation horlogère du canton. Elle a contribué à former plusieurs générations
              d’artisans et de techniciens reconnus pour leur maîtrise des savoirs mécaniques et esthétiques.
            </p>
            <p className="mt-3">
              D’abord installée au centre-ville, l’école a rejoint le
              <strong> Centre de Formation Professionnelle Technique (CFPT)</strong> de Plan-les-Ouates
              dans les années 2000, pour regrouper les métiers techniques de précision dans un environnement
              moderne et performant.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
              Description actuelle
            </h2>
            <p>
              Aujourd’hui, le CFPT propose des formations dans les domaines de l’horlogerie, de la micromécanique
              et du polissage. L’école forme des apprentis au CFC (Certificat Fédéral de Capacité) d’horloger-praticien,
              ainsi qu’à des formations continues pour les professionnels du secteur.
            </p>
            <p className="mt-3">
              Les ateliers modernes du CFPT offrent un environnement optimal pour l’apprentissage
              de la précision, avec des équipements comparables à ceux utilisés dans les manufactures suisses.
            </p>
          </div>
        </section>

        <div className="mt-10 border-t border-neutral-300 dark:border-neutral-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              📍 <strong>Adresse :</strong> Route des Acacias 45, 1227 Plan-les-Ouates, Genève
            </p>
          </div>

          <Link
            href="https://edu.ge.ch/site/cfpt/"
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
