'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollToTop() {
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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="scrollToTop"
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 30 }}
          whileHover={{
            scale: 1.1,
            boxShadow: '0 0 20px rgba(212,175,55,0.5)',
          }}
          transition={{
            type: 'spring',
            stiffness: 220,
            damping: 18,
            duration: 0.25,
          }}
          onClick={scrollToTop}
          aria-label="Remonter en haut"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center 
                     bg-[var(--gold)] text-black rounded-full shadow-lg hover:shadow-xl 
                     transition-all w-10 h-10 sm:w-12 sm:h-12"
        >
          <ChevronUp className="w-6 h-6 sm:w-7 sm:h-7" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
