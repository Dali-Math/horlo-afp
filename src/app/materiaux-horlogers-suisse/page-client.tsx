'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Animation fade-in-up
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function PageClient() {
  const [histoireTab, setHistoireTab] = useState<'XVIe' | 'XVIIIe' | 'XXe' | 'XXIe'>('XVIe')
  const [ecosystemeTab, setEcosystemeTab] = useState<'Jura' | 'Geneve' | 'Joux'>('Jura')
  const [avenirTab, setAvenirTab] = useState<'Durabilité' | 'Digitalisation' | 'Matériaux'>('Durabilité')

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute('href')!)
        if (target) {
          const offsetTop = (target as HTMLElement).offsetTop - 70
          window.scrollTo({ top: offsetTop, behavior: 'smooth' })
        }
      })
    })

    const statNumbers = document.querySelectorAll('.stat-number')
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target') || '0')
      let current = 0
      const increment = target / 50
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        ;(stat as HTMLElement).textContent = Math.floor(current).toString()
      }, 30)
    })
  }, [])

  return (
    <main className="text-gray-800 bg-white dark:bg-black dark:text-white overflow-hidden">
      {/* ton contenu animé ici — le même code complet précédent */}
      {/* ... */}
    </main>
  )
}
