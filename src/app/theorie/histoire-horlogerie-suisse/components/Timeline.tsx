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
      className="relative py-24 bg-gradient-to-b from-slate-900 via-gray-900 to-slate-800 text-white overflow-hidden"
    >
      {/* Texture de fond légère */}
      <div className="absolute inset-0 bg-[url('/imgs/horology_texture_dark.jpg')] bg-cover bg-center opacity-10" />

      <div className="relative z-10 section-container max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
          Chronologie Historique
        </h2>

        <div className="timeline-container space-y-20">
          {periods.map((period, index) => (
            <article
              key={period.year}
              className={`flex flex-col md:flex-row items-center gap-10 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image horlogère */}
              <div className="relative w-full md:w-1/2 aspect-[4/3] overflow-hidden rounded-2xl shadow-lg border border-amber-500/30">
                <Image
                  src={period.image || '/imgs/default_watch.jpg'}
                  alt={period.title}
                  fill
                  className="object-cover object-center brightness-90 hover:brightness-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-4 left-4 text-amber-400 text-lg font-semibold bg-black/40 px-3 py-1 rounded-md border border-amber-400/30">
                  {period.year}
                </span>
              </div>

              {/* Texte descriptif */}
              <div className="md:w-1/2 text-left">
                <h3 className="text-2xl font-bold text-amber-400 mb-4 drop-shadow-md">
                  {period.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {period.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
