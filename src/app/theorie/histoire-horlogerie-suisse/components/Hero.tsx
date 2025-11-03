// components/Hero.tsx
import React from 'react'
import Image from 'next/image'
import { Stat } from '../types'

interface HeroProps {
  stats: Stat[]
}

export function Hero({ stats }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex flex-col items-center justify-center text-center overflow-hidden bg-slate-900 text-white"
    >
      {/* Image de fond */}
      <Image
        src="/imgs/luxury_swiss_watch_tourbillon_complication_macro.jpg"
        alt="Mécanisme horloger de luxe"
        fill
        priority
        className="z-0"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          filter: 'brightness(0.4)',
        }}
      />

      {/* Overlay sombre (assure lisibilité du texte) */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Contenu principal */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
          L’Excellence Horlogère Suisse
        </h1>
        <p className="mt-4 text-lg text-gray-200">500 Ans de Savoir-Faire</p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-extrabold text-amber-400">
                {stat.value}
              </div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
