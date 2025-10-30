// src/app/outils/outils-de-mesure/page.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function OutilsDeMesure() {
  const outils = [
    {
      id: 'pied-a-coulisse',
      titre: 'Pied à coulisse numérique',
      resume:
        'Mesure rapide des diamètres, largeurs et entraxes avec lecture directe en mm/µm.',
      details:
        "Indispensable pour contrôler les dimensions des composants horlogers : ponts, boîtiers, barillets ou axes. Les versions numériques réduisent les erreurs de lecture.",
      image: '/images/outils/pied-a-coulisse.webp',
    },
    {
      id: 'micrometre',
      titre: 'Micromètre de précision',
      resume:
        'Outil essentiel pour mesurer des épaisseurs fines et des micro-jeux avec une précision de l’ordre du micron.',
      details:
        "Permet de mesurer les hauteurs de ressorts, flasques et composants fins. Les versions à encliquetage garantissent une pression constante.",
      image: '/images/outils/micrometre.webp',
    },
    {
      id: 'comparateur',
      titre: 'Comparateur sur colonne',
      resume:
        'Instrument servant à contrôler la planéité et la concentricité des pièces.',
      details:
        "Utilisé pour vérifier le faux-rond, le battement ou le voile d’une pièce. Monté sur support stable, il garantit la régularité des contrôles.",
      image: '/images/outils/comparateur-colonne.webp',
    },
    {
      id: 'jauges',
      titre: 'Jauges d’épaisseur et de diamètres',
      resume:
        'Feuilles cales et jauges à trous pour contrôler des jeux très fins ou des diamètres de pivots.',
      details:
        "Elles permettent d’ajuster le jeu entre les rubis, les pivots et les axes, garantissant un fonctionnement sans friction excessive.",
      image: '/images/outils/jauges-epaisseur.webp',
    },
    {
      id: 'mesure-video',
      titre: 'Système de mesure vidéo',
      resume:
        'Métrologie optique sans contact utilisée pour les micro-pièces horlogères.',
      details:
        "Permet d’effectuer des mesures précises de profils, rayons et entraxes grâce à une caméra haute résolution et un logiciel de traitement d’image.",
      image: '/images/outils/mesure-video.webp',
    },
    {
      id: 'loupe',
      titre: 'Loupe binoculaire micrométrique',
      resume:
        'Observation détaillée des composants sous fort grossissement avec repères gradués intégrés.',
      details:
        "Utilisée pour examiner l’état de surface, les chanfreins et les arêtes des pièces. Outil de base dans tout atelier horloger moderne.",
      image: '/images/outils/loupe-bino.webp',
    },
    {
      id: 'profondeur',
      titre: 'Micromètre de profondeur',
      resume:
        'Mesure les profondeurs de logements, rainures ou fraisures inaccessibles au pied à coulisse.',
      details:
        "Instrument précis pour contrôler la hauteur d’un composant dans son alésage ou l’épaisseur d’un fond usiné.",
      image: '/images/outils/micrometre-profondeur.webp',
    },
    {
      id: 'projecteur',
      titre: 'Projecteur de profil',
      resume:
        'Permet le contrôle optique de la forme d’une pièce par projection agrandie sur écran.',
      details:
        "Utilisé pour comparer un profil à un gabarit, mesurer des angles ou des rayons, et détecter d’éventuelles déformations.",
      image: '/images/outils/projecteur-profil.webp',
    },
    {
      id: 'cmm',
      titre: 'Machine de mesure tridimensionnelle (CMM)',
      resume:
        'Mesure automatisée des formes complexes en 3D par sonde tactile ou optique.',
      details:
        "Essentielle pour le contrôle qualité dans la microtechnique et l’horlogerie de précision.",
      image: '/images/outils/cmm-3d.webp',
    },
    {
      id: 'palpeur',
      titre: 'Palpeur numérique',
      resume:
        'Sonde de contact utilisée pour la prise de références et le contrôle automatisé.',
      details:
        "Présente sur les centres d’usinage modernes, elle assure des mesures répétables sans intervention manuelle.",
      image: '/images/outils/palpeur.webp',
    },
  ]

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-5xl font-semibold text-gray-900">
          Outils de mesure en horlogerie moderne
        </h1>
        <p className="mt-4 text-gray-600 max-w-3xl">
          Les instruments de mesure garantissent la précision et la fiabilité du travail horloger. 
          Voici dix outils couramment utilisés aujourd’hui dans les ateliers, accompagnés de leurs fonctions principales.
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            href="/theorie/lecture-de-plan/vues-techniques"
            className="rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Vues techniques
          </Link>
          <Link
            href="/outils"
            className="rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Tous les outils
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {outils.map((outil) => (
          <article
            key={outil.id}
            className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden"
          >
            <div className="relative w-full h-48">
              <Image
                src={outil.image}
                alt={outil.titre}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-900">{outil.titre}</h2>
              <p className="mt-2 text-sm text-gray-700">{outil.resume}</p>
              <p className="mt-2 text-sm text-gray-600">{outil.details}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="rounded-lg bg-gray-50 border border-gray-200 p-5 text-sm text-gray-700">
          <p>
            Cette sélection présente les outils de mesure les plus utilisés dans les ateliers horlogers contemporains. 
            Ils allient tradition et technologie pour garantir l’exactitude propre à l’horlogerie suisse.
          </p>
        </div>
      </section>
    </main>
  )
}
