'use client'
import React from 'react'

export default function PageTaskbar() {
  return (
    <header className="fixed top-[72px] left-0 right-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#c0c0c0]/20">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-[#fafafa] font-medium">🏠 Accueil</span>
          <span className="text-[#c0c0c0]/60">›</span>
          <span className="text-[#d4af37] font-semibold">Manufactures</span>
        </div>
        <button className="px-4 py-2 rounded-lg bg-[#1a1a1a] text-[#c0c0c0] hover:text-[#d4af37] transition-colors">
          🔍 Rechercher
        </button>
      </div>
    </header>
  )
}
