'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-40 left-6 z-40 w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 rounded-full shadow-xl hover:shadow-amber-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
      aria-label="Remonter en haut de page"
      title="Haut de page"
    >
      <ChevronUp className="w-6 h-6 text-slate-950" />
      <span className="absolute left-full ml-3 bg-slate-900 border border-slate-700 text-slate-200 text-xs px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
        Haut de page
      </span>
    </button>
  )
}
