'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function PatekLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    // Cache la barre globale du site HorloLearn
    const globalHeader = document.querySelector('header')
    if (globalHeader) globalHeader.style.display = 'none'

    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)

    return () => {
      // Restaure la barre du site quand on quitte la page Patek
      if (globalHeader) globalHeader.style.display = ''
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="bg-white text-gray-900">
      <nav
        className={`fixed top-0 w-full z-40 backdrop-blur-md border-b border-gray-200 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 shadow-sm' : 'bg-white/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/theorie/manufactures/patek-philippe" className="text-2xl font-bold">
            <span className="text-yellow-600">Patek</span> Philippe
          </Link>

          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <Link href="/theorie/manufactures/patek-philippe" className="hover:text-yellow-600 transition-colors">
              Accueil
            </Link>
            <Link href="/theorie/manufactures/patek-philippe/heritage" className="hover:text-yellow-600 transition-colors">
              Patrimoine
            </Link>
            <Link href="/theorie/manufactures/patek-philippe/innovation" className="hover:text-yellow-600 transition-colors">
              Innovation
            </Link>
            <Link href="/theorie/manufactures/patek-philippe/savoir-faire" className="hover:text-yellow-600 transition-colors">
              Savoir-faire
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-[100px]">{children}</main>
    </div>
  )
}
