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

export default function CpneAAChauxDeFonds() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 transition-colors">
      <section className="max-w-4xl mx-auto px-6 py-16">
        {/* Lien de retour */}
        <BackLink />

        <h1 className="mt-6 text-3xl md:text-5xl font-bold mb-6 text-amber-600 dark:text-amber-400">
          CPNE AA – Centre de Formation Professionnelle Neuchâtelois, Pôle Arts Appliqués
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-2">
          <strong>Canton :</strong> Neuchâtel – <strong>Ville :</strong> La Chaux-de-Fonds
        </p>

        <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-700 my-8">
          <Image
            src="/images/ecoles/cpne-aa-chauxdefonds.webp"
            alt="CPNE AA – Pôle Arts Appliqués – La Chaux-de-Fonds"
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
              Le <strong>CPNE AA</strong> (Centre de Formation Professionnelle Neuchâtelois – Pôle Arts Appliqués)
              perpétue à La Chaux-de-Fonds la tradition artistique et technique d’une région indissociable de 
              l’horlogerie suisse. Fondé dans la lignée des écoles d’art du XIXᵉ siècle, 
              il a contribué à former les graveurs, cadraniers et designers de montres 
              qui ont façonné le visage esthétique de l’horlogerie helvétique.
            </p>
            <p className="mt-3">
              La Chaux-de-Fonds, reconnue pour son urbanisme horloger unique au monde 
              (classé UNESCO), reste un haut lieu de créativité où se croisent art et mécanique.
              Le CPNE AA s’inscrit dans cette continuité culturelle et industrielle.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
              Description actuelle
            </h2>
            <p>
              Aujourd’hui, le CPNE AA forme des étudiants aux métiers d’art appliqués, 
              notamment en <strong>gravure horlogère</strong>, <strong>design de produit</strong>,
              <strong> graphisme</strong> et <strong>modélisation 3D</strong>. 
              Ces disciplines sont essentielles dans la création de cadrans, 
              boîtiers et composants esthétiques de montres suisses.
            </p>
            <p className="mt-3">
              L’école favorise la transversalité entre art et technique, 
              permettant aux étudiants d’explorer le lien entre créativité et précision. 
              Elle collabore avec les marques locales pour des projets réels de design horloger.
            </p>
          </div>
        </section>

        <div className="mt-10 border-t border-neutral-300 dark:border-neutral-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              📍 <strong>Adresse :</strong> Rue Numa-Droz 136, 2300 La Chaux-de-Fonds, Suisse
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
