'use client'

import React from 'react'
import Navigation from '@/components/Navigation'
import { Hero } from './components/Hero'
import { Timeline } from './components/Timeline'
import { Regions } from './components/Regions'
import { Manufactures } from './components/Manufactures'
import { Footer } from './components/Footer'
import { stats, periods, regions, manufactures } from './data/content'
import './styles/globals.css'

export default function HistoireHorlogeriePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-gray-50 text-gray-900">
      <Navigation
        darkMode={false}
        toggleDarkMode={() => {}}
        currentState="home"
        onNavigateHome={() => (window.location.href = '/')}
      />

      <main className="relative z-10 pt-24">
        <Hero stats={stats} />
        <Timeline periods={periods} />
        <Regions regions={regions} />
        <Manufactures manufactures={manufactures} />
      </main>

      <Footer />
    </div>
  )
}
