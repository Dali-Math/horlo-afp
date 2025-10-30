'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function IfageGeneve() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 transition-colors">
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-amber-600 dark:text-amber-400">
          Ifage – Fondation pour la Formation des Adultes
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-2">
          <strong>Canton :</strong> Genève – <strong>Ville :</strong> Genève
        </p>

        <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-700 my-8">
          <Image
            src="/images/ecoles/ifage-geneve.webp"
            alt="Ifage Genève – Fondation pour la Formation des Adultes"
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
              Fondée en <strong>1972</strong>, l’<strong>Ifage (Institut de Formation des Adultes de Genève)</strong> 
              est née de la volonté de proposer des formations professionnelles continues adaptées au tissu économique genevois. 
              L’institution a progressivement intégré la filière horlogère afin de répondre à la demande croissante de main-d’œuvre 
              qualifiée dans ce secteur d’excellence.
            </p>
            <p className="mt-3">
              Reconnue par le canton de Genève, l’Ifage s’est imposée comme un acteur clé de la formation technique, 
              combinant enseignement pratique et théorie appliquée, notamment dans les domaines de la micromécanique 
              et de la production horlogère.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
              Description actuelle
            </h2>
            <p>
              L’Ifage propose aujourd’hui des cursus modulaires destinés aussi bien aux débutants qu’aux professionnels en reconversion. 
              Son département horlogerie offre des formations en <strong>assemblage</strong>, <strong>réglage</strong> 
              et <strong>contrôle qualité</strong>, en lien direct avec les manufactures locales.
            </p>
            <p className="mt-3">
              L’école se distingue par sa pédagogie axée sur la pratique, la collaboration avec les entreprises horlogères de Genève 
              et la possibilité d’obtenir des <strong>certificats fédéraux reconnus</strong> dans plusieurs métiers techniques.
            </p>
          </div>
        </section>

        <div className="mt-10 border-t border-neutral-300 dark:border-neutral-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              📍 <strong>Adresse :</strong> Rue des Bains 20, 1205 Genève, Suisse
            </p>
          </div>

          <Link
            href="https://www.ifage.ch/"
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
