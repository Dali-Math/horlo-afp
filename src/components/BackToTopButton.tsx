'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) setIsVisible(true)
      else setIsVisible(false)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="back-to-top fixed bottom-6 right-6 bg-[var(--gold)] text-black p-3 rounded-full shadow-lg hover:opacity-80 transition"
      aria-label="Remonter en haut"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}
