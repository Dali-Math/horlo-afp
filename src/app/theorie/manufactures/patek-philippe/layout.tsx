'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function PatekLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const BASE = '/theorie/manufactures/patek-philippe'
  const linkClass = (href: string) => {
    const isActive =
      href === BASE ? pathname === BASE : pathname.startsWith(href)

    return [
      'relative transition-colors',
      isActive ? 'text-yellow-600' : 'text-gray-700 hover:text-yellow-600',
      'after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-yellow-600',
      isActive ? 'after:w-full' : 'after:w-0'
    ].join(' ')
  }

  return (
    <div className="bg-white text-gray-900">
      {/* ✅ Barre fixée juste sous la navbar principale */}
      <nav
        className={`fixed top-[90px] left-0 w-full z-40 border-b border-gray-200 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-md'
            : 'bg-white/60 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <Link href={BASE} className="text-2xl font-display font-bold">
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
            <Link href={BASE} className={linkClass(BASE)}>Accueil</Link>
            <Link href={`${BASE}/heritage`} className={linkClass(`${BASE}/heritage`)}>Patrimoine</Link>
            <Link href={`${BASE}/collections`} className={linkClass(`${BASE}/collections`)}>Collections</Link>
            <Link href={`${BASE}/innovation`} className={linkClass(`${BASE}/innovation`)}>Innovation</Link>
            <Link href={`${BASE}/savoir-faire`} className={linkClass(`${BASE}/savoir-faire`)}>Savoir-faire</Link>
          </div>
        </div>
      </nav>

      {/* ✅ Compensation pour éviter que le contenu passe sous la barre */}
      <div className="h-[90px]" />

      <main>{children}</main>
    </div>
  )
}
