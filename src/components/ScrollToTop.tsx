'use client'
import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    console.log('🟢 ScrollToTop monté')
    const handleScroll = () => {
      setVisible(window.scrollY > 150)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (visible) console.log('⬆️ Bouton visible')
  }, [visible])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-[9999] bg-[#d4af37] text-black rounded-full p-3 shadow-lg hover:shadow-xl transition"
      aria-label="Remonter en haut"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  )
}
