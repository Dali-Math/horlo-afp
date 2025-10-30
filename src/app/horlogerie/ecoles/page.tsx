'use client'

import Link from 'next/link'

export default function EcolesHorlogeres() {
  const ecoles = [
    {
      canton: 'Genève',
      items: [
        { nom: 'CFPT – École d’Horlogerie de Genève', ville: 'Plan-les-Ouates', lien: '/horlogerie/ecoles/cfpt-geneve' },
        { nom: 'Ifage – Fondation pour la Formation des Adultes', ville: 'Genève', lien: '/horlogerie/ecoles/ifage-geneve' },
        { nom: 'CFP Arts – Centre de Formation Professionnelle', ville: 'Genève', lien: '/horlogerie/ecoles/cfp-arts-geneve' },
        { nom: 'HEPIA – Haute École du Paysage, d’Ingénierie et d’Architecture', ville: 'Genève', lien: '/horlogerie/ecoles/hepia-geneve' },
      ],
    },
    {
      canton: 'Vaud',
      items: [
        { nom: 'ETVJ – École Technique de la Vallée de Joux', ville: 'Le Sentier', lien: '/horlogerie/ecoles/etvj-le-sentier' },
        { nom: 'HEIG-VD – Haute École d’Ingénierie et de Gestion du Canton de Vaud', ville: 'Yverdon-les-Bains', lien: '/horlogerie/ecoles/heigvd-yverdon' },
      ],
    },
    {
      canton: 'Neuchâtel',
      items: [
        { nom: 'CPNE – Centre de Formation Professionnelle Neuchâtelois', ville: 'Le Locle', lien: '/horlogerie/ecoles/cpne-le-locle' },
        { nom: 'CPNE AA – Pôle Arts Appliqués', ville: 'La Chaux-de-Fonds', lien: '/horlogerie/ecoles/cpne-arts-chauxdefonds' },
        { nom: 'Haute École Arc-Ingénierie', ville: 'Le Locle & Neuchâtel', lien: '/horlogerie/ecoles/haute-ecole-arc' },
        { nom: 'Fondation WOSTEP', ville: 'Neuchâtel', lien: '/horlogerie/ecoles/wostep-neuchatel' },
      ],
    },
    {
      canton: 'Jura',
      items: [
        { nom: 'CEJEF – Division Technique', ville: 'Porrentruy', lien: '/horlogerie/ecoles/cejef-porrentruy' },
      ],
    },
    {
      canton: 'Berne',
      items: [
        { nom: 'Lycée Technique de Bienne (CFP)', ville: 'Bienne', lien: '/horlogerie/ecoles/lycee-technique-bienne' },
        { nom: 'CEFF – Centre de Formation Professionnelle Berne Francophone', ville: 'Saint-Imier', lien: '/horlogerie/ecoles/ceff-saint-imier' },
      ],
    },
    {
      canton: 'Soleure',
      items: [
        { nom: 'ZeitZentrum – Uhrmacherschule Grenchen', ville: 'Granges', lien: '/horlogerie/ecoles/zeitzentrum-granges' },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 transition-colors">
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
          Écoles horlogères suisses
        </h1>

        <p className="text-center text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-16 leading-relaxed">
          Découvrez les principales écoles suisses d’horlogerie et de microtechnique, où se transmet la rigueur,
          la précision et l’esprit d’excellence du savoir-faire helvétique. <br />
          Ces établissements forment les artisans du temps de demain, entre tradition et innovation.
        </p>

        {ecoles.map((groupe, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mb-4 border-b border-neutral-300 dark:border-neutral-700 pb-2">
              {groupe.canton}
            </h2>
            <ul className="space-y-3 pl-4">
              {groupe.items.map((ecole, i) => (
                <li key={i} className="text-base">
                  <Link
                    href={ecole.lien}
                    className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  >
                    {ecole.nom}
                  </Link>{' '}
                  <span className="text-neutral-500 dark:text-neutral-400">– {ecole.ville}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  )
}
