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

export default function CfpArtsGeneve() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 transition-colors">
      <section className="max-w-4xl mx-auto px-6 py-16">
        {/* Lien de retour */}
        <BackLink />

        <h1 className="mt-6 text-3xl md:text-5xl font-bold mb-6 text-amber-600 dark:text-amber-400">
          CFP Arts – Centre de Formation Professionnelle
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-2">
          <strong>Canton :</strong> Genève – <strong>Ville :</strong> Genève
        </p>

        <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-700 my-8">
          <Image
            src="/images/ecoles/cfp-arts-geneve.webp"
            alt="CFP Arts Genève – Centre de Formation Professionnelle"
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
              Le <strong>Centre de Formation Professionnelle Arts Genève (CFP Arts)</strong> trouve ses origines 
              dans les écoles d’arts appliqués genevoises du début du XXᵉ siècle. 
              Il a progressivement intégré l’enseignement horloger, notamment dans les domaines du 
              <strong>design de montres</strong> et de la <strong>gravure</strong>.
            </p>
            <p className="mt-3">
              L’école s’est distinguée par son approche pluridisciplinaire, reliant 
              <strong>création artistique et savoir-faire technique</strong>, un équilibre rare 
              dans la formation horlogère. Elle a ainsi formé de nombreux artisans spécialisés 
              dans la conception esthétique de montres et d’objets de précision.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
              Description actuelle
            </h2>
            <p>
              Aujourd’hui, le CFP Arts propose des formations complètes en <strong>bijouterie</strong>, 
              <strong>microtechnique</strong>, <strong>gravure</strong> et <strong>design horloger</strong>. 
              Ces cursus allient les compétences manuelles traditionnelles aux outils numériques modernes.
            </p>
            <p className="mt-3">
              L’établissement met l’accent sur la créativité, la précision et la culture du 
              savoir-faire suisse, en étroite collaboration avec les manufactures et ateliers 
              de la région genevoise.
            </p>
          </div>
        </section>

        <div className="mt-10 border-t border-neutral-300 dark:border-neutral-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              📍 <strong>Adresse :</strong> Rue Necker 2, 1201 Genève, Suisse
            </p>
          </div>

          <Link
            href="https://edu.ge.ch/site/cfp-arts/"
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
