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
      className="relative min-h-[85vh] flex flex-col items-center justify-center text-center overflow-hidden isolate"
      style={{
        background: 'linear-gradient(to bottom, #fffbea, #fff, #f8f9fa)',
        color: '#2c2c2c',
      }}
    >
      {/* Image de fond douce */}
      <Image
        src="/imgs/luxury_swiss_watch_tourbillon_complication_macro.jpg"
        alt="Mécanisme horloger de luxe"
        fill
        priority
        className="z-0 opacity-35"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          filter: 'brightness(1.15) contrast(0.9)',
        }}
      />

      {/* Voile clair semi-transparent */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/90 to-white/95 z-0" />

      {/* Contenu principal */}
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <h1
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
          style={{
            color: '#e6a400',
            textShadow: '0 1px 2px rgba(0,0,0,0.15)',
          }}
        >
          L’Excellence Horlogère Suisse
        </h1>
        <p className="mt-3 text-lg md:text-xl text-gray-700">
          500 Ans de Savoir-Faire
        </p>

        {/* Statistiques */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div
                className="text-2xl md:text-3xl font-bold"
                style={{ color: '#e6a400' }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Fine ligne dorée en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(to right, #fcd34d, #fbbf24, #f59e0b)' }} />
    </section>
  )
}
