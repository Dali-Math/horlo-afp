'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Ruler, Search, ChevronRight } from 'lucide-react'

export default function OutilsDeMesure() {
  const outils = [
    {
      id: 'pied-a-coulisse',
      titre: 'Pied à coulisse numérique',
      resume: 'Mesure rapide des diamètres, largeurs et entraxes avec lecture directe en mm/µm.',
      details: "Indispensable pour contrôler les dimensions des composants horlogers : ponts, boîtiers, barillets ou axes. Les versions numériques réduisent les erreurs de lecture.",
      image: '/images/outils/pied-a-coulisse.webp',
      badge: 'Essentiel',
    },
    {
      id: 'micrometre',
      titre: 'Micromètre de précision',
      resume: 'Outil essentiel pour mesurer des épaisseurs fines et des micro-jeux avec une précision de l\'ordre du micron.',
      details: "Permet de mesurer les hauteurs de ressorts, flasques et composants fins. Les versions à encliquetage garantissent une pression constante.",
      image: '/images/outils/micrometre.webp',
      badge: 'Précision',
    },
    {
      id: 'comparateur',
      titre: 'Comparateur sur colonne',
      resume: 'Instrument servant à contrôler la planéité et la concentricité des pièces.',
      details: "Utilisé pour vérifier le faux-rond, le battement ou le voile d'une pièce. Monté sur support stable, il garantit la régularité des contrôles.",
      image: '/images/outils/comparateur-colonne.webp',
      badge: 'Contrôle',
    },
    {
      id: 'jauges',
      titre: 'Jauges d\'épaisseur et de diamètres',
      resume: 'Feuilles cales et jauges à trous pour contrôler des jeux très fins ou des diamètres de pivots.',
      details: "Elles permettent d'ajuster le jeu entre les rubis, les pivots et les axes, garantissant un fonctionnement sans friction excessive.",
      image: '/images/outils/jauges-epaisseur.webp',
      badge: 'Ajustement',
    },
    {
      id: 'mesure-video',
      titre: 'Système de mesure vidéo',
      resume: 'Métrologie optique sans contact utilisée pour les micro-pièces horlogères.',
      details: "Permet d'effectuer des mesures précises de profils, rayons et entraxes grâce à une caméra haute résolution et un logiciel de traitement d'image.",
      image: '/images/outils/mesure-video.webp',
      badge: 'Innovation',
    },
    {
      id: 'loupe',
      titre: 'Loupe binoculaire micrométrique',
      resume: 'Observation détaillée des composants sous fort grossissement avec repères gradués intégrés.',
      details: "Utilisée pour examiner l'état de surface, les chanfreins et les arêtes des pièces. Outil de base dans tout atelier horloger moderne.",
      image: '/images/outils/loupe-bino.webp',
      badge: 'Observation',
    },
    {
      id: 'profondeur',
      titre: 'Micromètre de profondeur',
      resume: 'Mesure les profondeurs de logements, rainures ou fraisures inaccessibles au pied à coulisse.',
      details: "Instrument précis pour contrôler la hauteur d'un composant dans son alésage ou l'épaisseur d'un fond usiné.",
      image: '/images/outils/micrometre-profondeur.webp',
      badge: 'Profondeur',
    },
    {
      id: 'projecteur',
      titre: 'Projecteur de profil',
      resume: 'Permet le contrôle optique de la forme d\'une pièce par projection agrandie sur écran.',
      details: "Utilisé pour comparer un profil à un gabarit, mesurer des angles ou des rayons, et détecter d'éventuelles déformations.",
      image: '/images/outils/projecteur-profil.webp',
      badge: 'Optique',
    },
    {
      id: 'cmm',
      titre: 'Machine de mesure tridimensionnelle (CMM)',
      resume: 'Mesure automatisée des formes complexes en 3D par sonde tactile ou optique.',
      details: "Essentielle pour le contrôle qualité dans la microtechnique et l'horlogerie de précision.",
      image: '/images/outils/cmm-3d.webp',
      badge: 'Haute technologie',
    },
    {
      id: 'palpeur',
      titre: 'Palpeur numérique',
      resume: 'Sonde de contact utilisée pour la prise de références et le contrôle automatisé.',
      details: "Présente sur les centres d'usinage modernes, elle assure des mesures répétables sans intervention manuelle.",
      image: '/images/outils/palpeur.webp',
      badge: 'Automatisation',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#E2B44F]/5 via-transparent to-[#E2B44F]/5 border-b border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-64 h-64 bg-[#E2B44F] rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
            <Link href="/outils" className="hover:text-[#E2B44F] transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Outils
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white font-medium">Outils de mesure</span>
          </div>

          {/* Title */}
          <div className="flex items-start gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-[#E2B44F] to-[#C9A043] rounded-2xl shadow-lg">
              <Ruler className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                Outils de <span className="text-[#E2B44F]">Mesure</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
                Les instruments de précision qui garantissent l'exactitude millimétrique propre à l'horlogerie suisse
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                <span className="text-[#E2B44F] font-bold">10</span> outils référencés
              </span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <Search className="w-4 h-4 text-[#E2B44F]" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Précision micrométrique
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/theorie/lecture-de-plan/vues-techniques"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-[#E2B44F] hover:text-[#E2B44F] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Vues techniques
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/outils"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E2B44F] text-white rounded-lg text-sm font-medium hover:bg-[#C9A043] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Tous les outils
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {outils.map((outil, index) => (
            <article
              key={outil.id}
              className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl hover:border-[#E2B44F]/50 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-[#E2B44F]/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-lg">
                {outil.badge}
              </div>

              {/* Image */}
              <div className="relative w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
                <Image
                  src={outil.image}
                  alt={outil.titre}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#E2B44F] transition-colors">
                  {outil.titre}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {outil.resume}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 line-clamp-3">
                  {outil.details}
                </p>

                {/* Hover Action */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="text-[#E2B44F] font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                    En savoir plus
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#E2B44F]/10 via-[#E2B44F]/5 to-transparent border border-[#E2B44F]/20 p-8 md:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E2B44F]/10 rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-[#E2B44F]/20 rounded-xl">
                <Ruler className="w-6 h-6 text-[#E2B44F]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  La Précision Horlogère
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                  Cette sélection présente les outils de mesure les plus utilisés dans les ateliers horlogers contemporains. 
                  Ils allient tradition et technologie pour garantir l'exactitude propre à l'horlogerie suisse. 
                  Chaque instrument joue un rôle crucial dans le contrôle qualité et la fabrication de montres de haute précision.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <div className="p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-[#E2B44F] mb-1">±1µm</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Précision maximale</div>
              </div>
              <div className="p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-[#E2B44F] mb-1">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Contrôle qualité</div>
              </div>
              <div className="p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-[#E2B44F] mb-1">Swiss</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Standard de précision</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
