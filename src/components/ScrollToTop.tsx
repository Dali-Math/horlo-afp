'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const check = () => {
      const canScroll = document.body.scrollHeight > window.innerHeight + 50
      const scrolled = window.scrollY > 150
      setShow(canScroll ? scrolled : true) // si page courte, montre le bouton quand même
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [])

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="scrolltop"
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 30 }}
          whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(212,175,55,0.5)' }}
          transition={{ type: 'spring', stiffness: 220, damping: 18, duration: 0.25 }}
          onClick={toTop}
          aria-label="Remonter en haut"
          className="
            fixed bottom-6 right-6 z-[9999] pointer-events-auto
            flex items-center justify-center
            rounded-full shadow-lg hover:shadow-xl transition-all
            bg-[var(--gold)] text-black
            w-10 h-10 sm:w-12 sm:h-12
          "
        >
          <ChevronUp className="w-6 h-6 sm:w-7 sm:h-7" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
