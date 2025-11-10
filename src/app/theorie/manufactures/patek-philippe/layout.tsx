// src/app/theorie/manufactures/patek-philippe/layout.tsx
'use client'

import Link from 'next/link'

export default function PatekLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white text-gray-900">
      {/* ✅ Navbar commune à toutes les pages Patek Philippe */}
      <nav className="fixed top-[90px] w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/theorie/manufactures/patek-philippe" className="text-2xl font-bold">
            <span className="text-yellow-600">Patek</span> Philippe
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="/theorie/manufactures/patek-philippe" className="hover:text-yellow-600">Accueil</Link>
            <Link href="/theorie/manufactures/patek-philippe/heritage" className="hover:text-yellow-600">Patrimoine</Link>
            <Link href="/theorie/manufactures/patek-philippe/innovation" className="hover:text-yellow-600">Innovation</Link>
            <Link href="/theorie/manufactures/patek-philippe/savoir-faire" className="hover:text-yellow-600">Savoir-faire</Link>
          </div>
        </div>
      </nav>

      {/* ✅ Contenu spécifique à chaque sous-page */}
      <main className="pt-32">{children}</main>
    </div>
  )
}
