'use client'

import React from 'react'
import Navigation from '@/components/Navigation' // ta vraie barre HorloLearn
import { Hero } from './components/Hero'
import { Timeline } from './components/Timeline'
import { Regions } from './components/Regions'
import { Manufactures } from './components/Manufactures'
import { Footer } from './components/Footer'
import { useTheme } from './hooks/useTheme'
import { useScrollAnimations } from './hooks/useScrollAnimations'
import { stats, periods, regions, manufactures } from './data/content'
import './styles/globals.css'

export default function HistoireHorlogeriePage() {
  const { theme, toggleTheme, mounted } = useTheme()
  useScrollAnimations()

  if (!mounted) return null

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white'
          : 'bg-gradient-to-br from-amber-50 via-gray-100 to-white text-gray-900'
      }`}
    >
      {/* Barre de navigation globale HorloLearn */}
      <Navigation
        darkMode={theme === 'dark'}
        toggleDarkMode={toggleTheme}
        currentState="home"
        onNavigateHome={() => (window.location.href = '/')}
      />

      {/* Contenu principal visible sous la barre */}
      <main className="relative z-10 pt-24 overflow-x-hidden">
        <Hero stats={stats} />
        <Timeline periods={periods} />
        <Regions regions={regions} />
        <Manufactures manufactures={manufactures} />
      </main>

      <Footer />
    </div>
  )
}
