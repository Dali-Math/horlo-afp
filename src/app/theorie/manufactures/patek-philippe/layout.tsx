'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function PatekLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-white text-gray-900">
      {/* Sous-barre Patek Philippe (sous la navbar HorloLearn) */}
      <nav
  className={`fixed top-[90px] w-full z-40 border-b border-gray-200 transition-all duration-300 ${
    isScrolled
      ? 'bg-white/70 backdrop-blur-xl shadow-md'
      : 'bg-white/40 backdrop-blur-md'
  }`}
>
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <Link 
  href="/theorie/manufactures/patek-philippe" 
  className="text-2xl font-display font-bold"
>
  <span
    style={{
      background: 'linear-gradient(90deg, #d9b74f, #d4af37)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    }}
  >
    Patek Philippe
  </span>
</Link>

          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <Link href="/theorie/manufactures/patek-philippe" className="hover:text-yellow-600 transition-colors">
              Accueil
            </Link>
            <Link href="/theorie/manufactures/patek-philippe/heritage" className="hover:text-yellow-600 transition-colors">
              Patrimoine
            </Link>
            <Link href="/theorie/manufactures/patek-philippe/collections" className="hover:text-yellow-600 transition-colors">
              Collections
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

      {/* Contenu spécifique à chaque page */}
      <main className="pt-6">{children}</main>
    </div>
  )
}
