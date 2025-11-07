'use client'
import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 150)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return visible ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-[9999] bg-[var(--gold)] text-black rounded-full p-3 shadow-lg hover:shadow-xl transition"
      aria-label="Remonter en haut"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  ) : null
}
