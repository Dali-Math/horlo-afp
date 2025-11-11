'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

export default function PatekLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const linkClass = (path: string) =>
    `${pathname === path || pathname.startsWith(path + '/')
      ? 'text-yellow-600 font-semibold border-b-2 border-yellow-600 pb-1'
      : 'text-gray-700 hover:text-yellow-600'
    } transition-colors`

  const mobileLinkClass = (path: string) =>
    `${pathname === path || pathname.startsWith(path + '/')
      ? 'text-yellow-600 font-semibold'
      : 'text-gray-800 hover:text-yellow-600'
    } block py-2`

  return (
    <div className="bg-white text-gray-900">
      {/* Sous-barre Patek Philippe */}
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

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <Link href="/theorie/manufactures/patek-philippe" className={linkClass('/theorie/manufactures/patek-philippe')}>
              Accueil
            </Link>
            <Link href="/theorie/manufactures/patek-philippe/heritage" className={linkClass('/theorie/manufactures/patek-philippe/heritage')}>
              Patrimoine
            </Link>
            <Link href="/theorie/manufactures/patek-philippe/collections" className={linkClass('/theorie/manufactures/patek-philippe/collections')}>
              Collections
            </Link>
            <Link href="/theorie/manufactures/patek-philippe/innovation" className={linkClass('/theorie/manufactures/patek-philippe/innovation')}>
              Innovation
            </Link>
            <Link href="/theorie/manufactures/patek-philippe/savoir-faire" className={linkClass('/theorie/manufactures/patek-philippe/savoir-faire')}>
              Savoir-faire
            </Link>
          </div>

          {/* Bouton Mobile */}
          <button
            className="md:hidden text-gray-700 hover:text-yellow-600 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Ouvrir le menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-2 shadow-lg">
            <Link href="/theorie/manufactures/patek-philippe" className={mobileLinkClass('/theorie/manufactures/patek-philippe')} onClick={() => setMenuOpen(false)}>
              Accueil
            </Link>
            <Link href="/theorie/manufactures/patek-philippe/heritage" className={mobileLinkClass('/theorie/manufactures/patek-philippe/heritage')} onClick={() => setMenuOpen(false)}>
              Patrimoine
            </Link>
            <Link href="/theorie/manufactures/patek-philippe/collections" className={mobileLinkClass('/theorie/manufactures/patek-philippe/collections')} onClick={() => setMenuOpen(false)}>
              Collections
            </Link>
            <Link href="/theorie/manufactures/patek-philippe/innovation" className={mobileLinkClass('/theorie/manufactures/patek-philippe/innovation')} onClick={() => setMenuOpen(false)}>
              Innovation
            </Link>
            <Link href="/theorie/manufactures/patek-philippe/savoir-faire" className={mobileLinkClass('/theorie/manufactures/patek-philippe/savoir-faire')} onClick={() => setMenuOpen(false)}>
              Savoir-faire
            </Link>
          </div>
        )}
      </nav>

      {/* Contenu des pages */}
      <main className="pt-6">{children}</main>
    </div>
  )
}
