'use client'

import React, { useState } from 'react'
import { Search, ExternalLink, BookOpen, FileText } from 'lucide-react'

export default function RessourcesPage() {
  const [search, setSearch] = useState('')

  const data = [
    {
      id: 1,
      title: 'Understanding Swiss Watch Movements',
      desc: 'A deep dive into the intricate mechanisms that define the Swiss watchmaking tradition.',
      category: 'Technical',
      image: '/images/resources/resource1.jpg',
      link: '#'
    },
    {
      id: 2,
      title: 'Timeline of Horological Innovation',
      desc: 'Explore the evolution of Swiss horology from the 16th century to the present day.',
      category: 'History',
      image: '/images/resources/resource2.jpg',
      link: '#'
    },
    {
      id: 3,
      title: 'Mastering Finishing Techniques',
      desc: 'Discover the art of polishing, anglage, and Côtes de Genève that make Swiss watches unique.',
      category: 'Craftsmanship',
      image: '/images/resources/resource3.jpg',
      link: '#'
    },
    {
      id: 4,
      title: 'Professional Watchmaking Training',
      desc: 'An overview of educational pathways for aspiring Swiss watchmakers.',
      category: 'Education',
      image: '/images/resources/resource4.jpg',
      link: '#'
    },
  ]

  const filtered = data.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.desc.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#020617] text-white">
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-300">
            Horological Resources
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Explore curated documents, research, and historical archives from the Swiss watchmaking world.
          </p>
        </div>

        <div className="relative max-w-xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-800/60 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-400 focus:outline-none"
          />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="group relative bg-slate-900/70 border border-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-sky-500/20 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="h-52 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2 text-sky-400 text-sm font-semibold">
                  <BookOpen className="w-4 h-4" />
                  {item.category}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-sky-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{item.desc}</p>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 text-sm font-semibold transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  View Resource
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-20">
          <p className="text-slate-500 text-sm">
            © 2025 Swiss Horological Archives — All Rights Reserved
          </p>
        </div>
      </section>
    </main>
  )
}
