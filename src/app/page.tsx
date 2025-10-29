'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { 
  Clock, 
  Watch, 
  BookOpen, 
  Award, 
  Heart, 
  ChevronRight, 
  Menu, 
  X, 
  Users, 
  Share2,
  Download,
  PlayCircle,
  FileText,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Radio,
  Globe
} from 'lucide-react'

const FadeInSection = ({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export default function HorloLearnHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [time, setTime] = useState(new Date())
  const [onlineUsers] = useState(48)
  const { scrollYProgress } = useScroll()

  const gearRotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const gearRotateReverse = useTransform(scrollYProgress, [0, 1], [0, -360])

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const secondsDegrees = (time.getSeconds() / 60) * 360
  const minutesDegrees = ((time.getMinutes() + time.getSeconds() / 60) / 60) * 360
  const hoursDegrees = ((time.getHours() % 12 + time.getMinutes() / 60) / 12) * 360

  const navigationLinks = [
    { label: 'Théorie', href: '/theorie', hasDropdown: true, subLinks: [{ label: 'Lecture de plan', href: '/theorie/lecture-de-plan' }] },
    { label: 'Pratique', href: '/pratique' },
    { label: 'Quiz', href: '/quiz' },
    { label: 'Outils', href: '/outils' },
    { label: 'Ressources', href: '/ressources' },
    { label: 'CH Horlogerie Suisse', href: '/ch-horlogerie-suisse' },
    { label: 'Podcasts', href: '/podcasts' },
    { label: 'Culture', href: '/culture' },
    { label: 'Événements', href: '/evenements' },
    { label: 'Communauté', href: '/communaute' },
  ]

  const featuredResources = [
    { type: 'PDF', title: 'Guide complet ETA 2824-2', description: 'Document PDF haute résolution : démontage complet, éclaté annoté, couples de serrage', author: 'Michel R.', downloads: '2,340', readTime: '15 min', badge: 'Ressource de la semaine' },
    { type: 'Vidéo', title: 'Réglage spiral ETA 6497', description: 'Tutoriel vidéo HD : technique professionnelle de réglage du spiral', author: 'Jean-Claude B.', downloads: '1,890', readTime: '22 min', badge: 'Populaire' },
    { type: 'Guide', title: 'Révision complète Valjoux 7750', description: 'Guide pas-à-pas avec photos et conseils d\'expert', author: 'Sophie L.', downloads: '1,560', readTime: '35 min', badge: 'Nouveau' },
  ]

  const actualites = [
    { title: 'Watches & Wonders 2026 : Dates confirmées', time: 'Il y a 2 jours', category: 'Événement' },
    { title: 'Nouveau calibre Sellita SW330-2 annoncé', time: 'Il y a 5 jours', category: 'Innovation' },
    { title: 'Formation AFP : Nouveaux programmes 2026', time: 'Il y a 1 semaine', category: 'Formation' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">

      {/* Arrière-plan engrenages */}
      <div className="fixed inset-0 opacity-5 pointer-events-none overflow-hidden">
        <motion.div style={{ rotate: gearRotate, willChange: 'transform' }} className="absolute top-10 right-10 w-80 md:w-96 h-80 md:h-96">
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            {[...Array(12)].map((_, i) => (
              <rect key={i} x="48" y="10" width="4" height="10" fill="currentColor" style={{ transform: `rotate(${i * 30}deg)`, transformOrigin: '50px 50px' }} />
            ))}
          </svg>
        </motion.div>
        <motion.div style={{ rotate: gearRotateReverse, willChange: 'transform' }} className="absolute bottom-20 left-10 w-64 md:w-72 h-64 md:h-72">
          <svg viewBox="0 0 100 100" className="w-full h-full text-blue-400">
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
            {[...Array(8)].map((_, i) => (
              <rect key={i} x="48" y="15" width="4" height="8" fill="currentColor" style={{ transform: `rotate(${i * 45}deg)`, transformOrigin: '50px 50px' }} />
            ))}
          </svg>
        </motion.div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-black z-50 border-b border-gray-800">
        <div className="w-full px-6 lg:px-16">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center space-x-3 mr-auto">
              <motion.svg viewBox="0 0 50 50" className="w-10 h-10" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                <circle cx="25" cy="25" r="23" fill="none" stroke="#f59e0b" strokeWidth="1" />
                {[...Array(12)].map((_, i) => (
                  <circle key={i} cx={25 + 19 * Math.cos((i * 30 - 90) * Math.PI / 180)} cy={25 + 19 * Math.sin((i * 30 - 90) * Math.PI / 180)} r="1.5" fill="#f59e0b" />
                ))}
              </motion.svg>
              <div>
                <span className="text-xl font-bold leading-tight"><span className="text-amber-400">Horlo</span><span className="text-white">Learn</span></span>
                <p className="text-xs text-gray-400">Passion & Découverte</p>
              </div>
            </Link>
            <div className="hidden lg:flex items-center space-x-10 ml-12">
              {navigationLinks.map((link, index) => (
                <div key={index} className="relative" onMouseEnter={() => link.hasDropdown && setOpenDropdown(link.label)} onMouseLeave={() => setOpenDropdown(null)}>
                  <Link href={link.href} className="text-white text-sm hover:text-gray-300 flex items-center">{link.label}{link.hasDropdown && <span className="ml-1 text-xs">▼</span>}</Link>
                  {link.hasDropdown && link.subLinks && openDropdown === link.label && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-full left-0 mt-2 w-56 bg-gray-900 border border-gray-800 rounded-lg shadow-xl py-2">
                      {link.subLinks.map((sub, i) => (
                        <Link key={i} href={sub.href} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-amber-400">{sub.label}</Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-white ml-auto">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-8">
              <Sparkles className="w-5 h-5 text-amber-400 mr-2" />
              <span className="text-amber-400 font-semibold text-sm">L'horlogerie suisse accessible à tous</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Passion & Découverte</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500">Horlogère Suisse</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Explorez librement ressources, tutoriels et savoirs horlogers partagés par des <span className="text-amber-400 font-semibold">passionnés</span> pour des <span className="text-amber-400 font-semibold">passionnés</span>
            </p>
          </motion.div>

          {/* Horloge Responsive */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative flex justify-center items-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl" />
              <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-full shadow-2xl border-8 border-amber-500/20 flex items-center justify-center" style={{ willChange: 'transform' }}>
                <div className="absolute inset-8 border-2 border-amber-500/10 rounded-full" />
                <div className="absolute inset-12 border border-amber-500/5 rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        .backdrop-blur-sm { -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px); }
      `}</style>
    </div>
  )
}
