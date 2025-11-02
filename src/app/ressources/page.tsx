'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ChevronLeft,
  Search,
  FileText,
  BookOpen,
  Globe,
  Users,
  Calendar,
  Filter
} from 'lucide-react'

// ==== Données des ressources ====
interface Resource {
  id: string
  title: string
  description: string
  url: string
  image?: string
  type: 'PDF' | 'Article' | 'Site web' | 'Glossaire' | 'Base de données'
  category: 'Documents techniques' | 'Histoire' | 'Glossaires' | 'Sites de référence'
  language: 'FR' | 'EN' | 'Multilingue'
  isFeatured?: boolean
  isNew?: boolean
  fileSize?: string
  lastUpdate?: string
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Le Chronographe Mécanique',
    description: "Découvrez le fonctionnement du chronographe mécanique, un mécanisme emblématique de l'horlogerie avec schémas détaillés.",
    url: '/documents/chronographe-mecanique.pdf',
    type: 'PDF',
    category: 'Documents techniques',
    language: 'FR',
    isFeatured: true,
    fileSize: '12 MB',
    lastUpdate: 'Oct 2025',
    image: '/images/ressources/eta7750_chronographe.png'
  },
  {
    id: '2',
    title: 'Document AFP ETA 6497',
    description: 'Document officiel pour les étudiants AFP : démontage, remontage et réglage complet.',
    url: '/documents/eta-6497-afp.pdf',
    type: 'PDF',
    category: 'Documents techniques',
    language: 'FR',
    isFeatured: true,
    isNew: true,
    fileSize: '25 MB',
    lastUpdate: 'Oct 2025',
    image: '/images/ressources/patek_calatrava.png'
  },
  {
    id: '3',
    title: 'Guide Complet du Chronographe',
    description: 'Téléchargez le guide technique complet du chronographe : mécanisme, réglage et entretien.',
    url: '/documents/guide-chronographe.pdf',
    type: 'PDF',
    category: 'Documents techniques',
    language: 'FR',
    fileSize: '18 MB',
    lastUpdate: 'Sept 2025',
    image: '/images/ressources/chronoscope_swiss_made.png'
  },
  {
    id: '4',
    title: 'Évolution des Manufactures Horlogères',
    description: "Article retraçant l'évolution des manufactures horlogères suisses depuis le XIXe siècle.",
    url: 'https://www.fhs.swiss/histoire-manufactures',
    type: 'Article',
    category: 'Histoire',
    language: 'FR',
    image: '/images/ressources/marques_header.png'
  },
  {
    id: '5',
    title: 'Fondation de la Haute Horlogerie',
    description: 'Référence mondiale pour la culture et le patrimoine horloger. Encyclopédie complète et actualités du secteur.',
    url: 'https://www.hautehorlogerie.org',
    type: 'Site web',
    category: 'Sites de référence',
    language: 'Multilingue',
    isFeatured: true,
    image: '/images/ressources/formation_header.png'
  },
  {
    id: '6',
    title: 'Glossaire Technique FHH',
    description: 'Dictionnaire officiel de la Fondation de la Haute Horlogerie avec plus de 600 termes techniques.',
    url: 'https://www.hautehorlogerie.org/fr/encyclopedie/glossaire',
    type: 'Glossaire',
    category: 'Glossaires',
    language: 'Multilingue',
    image: '/images/ressources/mouvements_header.png'
  },
  {
    id: '7',
    title: 'Archives Horlogères Numériques',
    description: "Base de données de calibres historiques et documents d'époque numérisés.",
    url: 'https://www.horlogerie-suisse.com/archives',
    type: 'Base de données',
    category: 'Sites de référence',
    language: 'FR',
    image: '/images/ressources/tourbillon_breguet.png'
  }
]

// ==== Page principale ====
export default function RessourcesV2Page() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [languageFilter, setLanguageFilter] = useState('')

  const filtered = resources.filter(
    (r) =>
      (r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase())) &&
      (typeFilter === '' || r.type === typeFilter) &&
      (categoryFilter === '' || r.category === categoryFilter) &&
      (languageFilter === '' || r.language === languageFilter)
  )

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 via-sky-50 to-white text-slate-900">
      {/* ===== HERO HEADER ===== */}
      <section className="bg-gradient-to-b from-blue-700 to-sky-500 text-white text-center py-16 shadow-md">
        <h1 className="text-5xl font-bold mb-3">Ressources Horlogerie Suisse</h1>
        <p className="text-lg opacity-90 max-w-3xl mx-auto">
          Collection complète pour collectionneurs amateurs et professionnels : marques légendaires, calibres techniques, complications, formation et finitions Swiss Made.
        </p>
        <div className="mt-10 flex justify-center gap-12 text-center text-sky-50">
          <div>
            <span className="text-4xl font-bold">15</span>
            <p>Ressources</p>
          </div>
          <div>
            <span className="text-4xl font-bold">7</span>
            <p>Catégories</p>
          </div>
          <div>
            <span className="text-4xl font-bold">50+</span>
            <p>Documents</p>
          </div>
        </div>
      </section>

      {/* ===== Barre de navigation ===== */}
      <header className="max-w-7xl mx-auto px-6 py-4">
        <Link href="/" className="inline-flex items-center text-blue-700 hover:text-blue-900 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Retour à l&apos;accueil
        </Link>
      </header>

      {/* ===== Barre de recherche + filtres ===== */}
      <div className="max-w-7xl mx-auto px-6 py-8 bg-white border border-slate-200 rounded-3xl shadow-lg mb-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Recherche */}
          <div className="relative w-full lg:w-1/2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher une ressource..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap gap-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="p-3 bg-white border border-slate-300 rounded-xl text-slate-700"
            >
              <option value="">Type</option>
              <option value="PDF">PDF</option>
              <option value="Article">Article</option>
              <option value="Site web">Site web</option>
              <option value="Glossaire">Glossaire</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="p-3 bg-white border border-slate-300 rounded-xl text-slate-700"
            >
              <option value="">Catégorie</option>
              <option value="Documents techniques">Documents techniques</option>
              <option value="Histoire">Histoire</option>
              <option value="Sites de référence">Sites de référence</option>
              <option value="Glossaires">Glossaires</option>
            </select>

            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="p-3 bg-white border border-slate-300 rounded-xl text-slate-700"
            >
              <option value="">Langue</option>
              <option value="FR">FR</option>
              <option value="EN">EN</option>
              <option value="Multilingue">Multilingue</option>
            </select>
          </div>
        </div>
      </div>

      {/* ===== Section Ressources ===== */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          Toutes les ressources ({filtered.length})
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((r) => (
            <a
              key={r.id}
              href={r.url}
              target={r.url.startsWith('/') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              {r.image && (
                <div className="relative w-full h-48">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-blue-600">
                    <FileText className="w-5 h-5" />
                    <span className="font-semibold text-sm">{r.type}</span>
                  </div>
                  {r.isNew && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-lg font-semibold">
                      🆕 Nouveau
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {r.title}
                </h3>
                <p className="text-sm text-slate-600 mb-3">{r.description}</p>
                <div className="flex justify-between text-xs text-slate-500 border-t border-slate-200 pt-3">
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3" /> {r.language}
                  </span>
                  {r.lastUpdate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {r.lastUpdate}
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <section className="mt-20 bg-gradient-to-r from-blue-100 to-sky-100 rounded-3xl p-12 text-center border border-blue-200 shadow-inner">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">
            Une ressource manquante ?
          </h2>
          <p className="text-lg text-slate-700 mb-8">
            Partagez vos sources favorites avec la communauté HorloLearn.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg"
          >
            <Users className="w-5 h-5" />
            Proposer une source
          </Link>
        </section>
      </div>
    </main>
  )
}
