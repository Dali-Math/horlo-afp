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

export default function HeigvdYverdon() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 transition-colors">
      <section className="max-w-4xl mx-auto px-6 py-16">
        {/* Lien de retour */}
        <BackLink />

        <h1 className="mt-6 text-3xl md:text-5xl font-bold mb-6 text-amber-600 dark:text-amber-400">
          HEIG-VD – Haute École d’Ingénierie et de Gestion du canton de Vaud
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-2">
          <strong>Canton :</strong> Vaud – <strong>Ville :</strong> Yverdon-les-Bains
        </p>

        <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-700 my-8">
          <Image
            src="/images/ecoles/heigvd-yverdon.webp"
            alt="HEIG-VD – Haute École d’Ingénierie et de Gestion du canton de Vaud"
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
              L’<strong>HEIG-VD</strong> (Haute École d’Ingénierie et de Gestion du canton de Vaud) 
              trouve ses racines dans l’ancienne École d’Ingénieurs d’Yverdon, fondée dans les années 1950. 
              Elle a évolué au fil des décennies pour devenir un pôle d’excellence en innovation, 
              ingénierie de précision et microtechnique, domaines directement liés à la recherche horlogère.
            </p>
            <p className="mt-3">
              Depuis sa création, elle a entretenu des collaborations étroites avec les manufactures horlogères 
              du Jura vaudois et de la Vallée de Joux, contribuant à la formation d’ingénieurs spécialisés 
              dans la conception et la fabrication de composants de haute précision.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
              Description actuelle
            </h2>
            <p>
              Aujourd’hui, l’HEIG-VD forme des ingénieurs dans des domaines stratégiques tels que 
              la <strong>microtechnique</strong>, la <strong>mécatronique</strong>, la 
              <strong> conception de systèmes</strong> et la <strong>gestion industrielle</strong>. 
              Son enseignement allie théorie, recherche appliquée et pratique en entreprise.
            </p>
            <p className="mt-3">
              De nombreux projets étudiants sont menés en collaboration avec des marques horlogères 
              ou des fournisseurs de l’industrie suisse de la précision, 
              faisant de l’HEIG-VD un acteur clé dans la transmission du savoir technologique horloger.
            </p>
          </div>
        </section>

        <div className="mt-10 border-t border-neutral-300 dark:border-neutral-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              📍 <strong>Adresse :</strong> Route de Cheseaux 1, 1400 Yverdon-les-Bains, Suisse
            </p>
          </div>

          <Link
            href="https://heig-vd.ch/"
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
