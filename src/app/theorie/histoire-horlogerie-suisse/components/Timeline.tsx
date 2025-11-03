// components/Timeline.tsx
import React from 'react'
import Image from 'next/image'
import { Period } from '../types'

interface TimelineProps {
  periods: Period[]
}

export function Timeline({ periods }: TimelineProps) {
  return (
    <section
      id="chronologie"
      className="relative py-24 bg-gradient-to-b from-amber-50 via-white to-gray-50 text-gray-900 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 tracking-tight">
          Chronologie Historique
        </h2>

        <div className="space-y-20">
          {periods.map((period, index) => (
            <article
              key={period.year}
              className={`flex flex-col md:flex-row items-center gap-10 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image horlogère */}
              <div className="relative w-full md:w-1/2 aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
                <Image
                  src={period.image || '/imgs/default_watch.jpg'}
                  alt={period.title}
                  fill
                  className="object-cover object-center brightness-100 transition-all duration-500"
                />
                <span className="absolute bottom-4 left-4 bg-white/80 text-gray-800 text-sm font-semibold px-3 py-1 rounded-md shadow">
                  {period.year}
                </span>
              </div>

              {/* Contenu texte */}
              <div className="md:w-1/2 text-left">
                <h3 className="text-2xl font-semibold text-amber-700 mb-3">
                  {period.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {period.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Ligne décorative discrète */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-200 via-amber-300 to-transparent opacity-70 hidden md:block" />
    </section>
  )
}
