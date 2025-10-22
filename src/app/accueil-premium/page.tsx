'use client'

import React, { useState, useEffect, useRef } from 'react'
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

const FadeInSection = ({ id, children, className = "" }: { id?: string, children: React.ReactNode, className?: string }) => {
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

// --- Page Principale ---
export default function HorloLearnHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
    { label: 'Accueil', href: '#accueil' },
    { label: 'Ressources', href: '#ressources' },
    { label: 'Communauté', href: '#communaute' },
    { label: 'Actualités', href: '#actualites' },
    { label: 'Contribuer', href: '#contribuer' },
  ]

  const stats = [
    { value: '2,500+', label: 'Ressources Partagées', icon: FileText },
    { value: '1,200+', label: 'Passionnés Actifs', icon: Users },
    { value: '150h+', label: 'Vidéos Tutoriels', icon: PlayCircle },
    { value: '100%', label: 'Gratuit & Libre', icon: Heart },
  ]

  const thematiques = [
    {
      icon: '📚',
      title: 'Théorie',
      description: 'Principes fondamentaux, histoire et terminologie horlogère',
      items: ['Cours détaillés', 'Schémas annotés', 'Glossaire illustré'],
      color: 'from-blue-500 to-cyan-500',
      resources: '850+'
    },
    {
      icon: '🔧',
      title: 'Pratique',
      description: 'Démontage, remontage et réglage de mouvements',
      items: ['Tutoriels vidéo', 'Plans techniques', 'Guides pas-à-pas'],
      color: 'from-amber-500 to-orange-500',
      resources: '1,200+'
    },
    {
      icon: '✅',
      title: 'Évaluation',
      description: 'Testez vos connaissances avec nos quiz interactifs',
      items: ['Quiz interactifs', 'Correction détaillée', 'Suivi progrès'],
      color: 'from-green-500 to-emerald-500',
      resources: '450+'
    },
  ]

  const featuredResources = [
    {
      type: 'PDF',
      title: 'Guide complet ETA 2824-2',
      description: 'Document PDF haute résolution : démontage complet, éclaté annoté, couples de serrage',
      author: 'Michel R.',
      downloads: '2,340',
      readTime: '15 min',
      badge: 'Ressource de la semaine'
    },
    {
      type: 'Vidéo',
      title: 'Réglage spiral ETA 6497',
      description: 'Tutoriel vidéo HD : technique professionnelle de réglage du spiral',
      author: 'Jean-Claude B.',
      downloads: '1,890',
      readTime: '22 min',
      badge: 'Populaire'
    },
    {
      type: 'Guide',
      title: 'Révision complète Valjoux 7750',
      description: "Guide pas-à-pas avec photos et conseils d'expert",
      author: 'Sophie L.',
      downloads: '1,560',
      readTime: '35 min',
      badge: 'Nouveau'
    },
  ]

  const actualites = [
    {
      title: 'Watches & Wonders 2026 : Dates confirmées',
      time: 'Il y a 2 jours',
      category: 'Événement'
    },
    {
      title: 'Nouveau calibre Sellita SW330-2 annoncé',
      time: 'Il y a 5 jours',
      category: 'Innovation'
    },
    {
      title: 'Formation AFP : Nouveaux programmes 2026',
      time: 'Il y a 1 semaine',
      category: 'Formation'
    },
  ]

  // ------> Nouvelle navigation <------
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/95 backdrop-blur-md z-50 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <a href="/" className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10">
                <motion.svg
                  viewBox="0 0 50 50"
                  className="w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <circle cx="25" cy="25" r="20" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                  <circle cx="25" cy="25" r="16" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.5" />
                  {[...Array(12)].map((_, i) => (
                    <line key={i} x1="25" y1="7" x2="25" y2="11" stroke="#f59e0b" strokeWidth="1"
                      style={{ transform: `rotate(${i * 30}deg)`, transformOrigin: '25px 25px' }} />
                  ))}
                </motion.svg>
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  <span className="text-amber-400">Horlo</span>
                  <span className="text-white">Learn</span>
                </h1>
              </div>
            </a>

            {/* Navigation Desktop */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { label: 'Théorie', href: '/theorie' },
                { label: 'Pratique', href: '/pratique' },
                { label: 'Évaluation', href: '/evaluation' },
                { label: 'Actualités', href: '/actualites' },
              ].map((link) => (
                <a 
                  key={link.label}
                  href={link.href} 
                  className="px-4 py-2 text-sm text-gray-300 hover:text-amber-400 hover:bg-slate-800/50 rounded-lg transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
              
              <button className="ml-4 px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                Contribuer
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden p-2 text-gray-300 hover:text-amber-400 hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-slate-900/98 backdrop-blur-md border-t border-slate-800/50"
          >
            <div className="px-4 py-4 space-y-1">
              {[
                { label: 'Théorie', href: '/theorie' },
                { label: 'Pratique', href: '/pratique' },
                { label: 'Évaluation', href: '/evaluation' },
                { label: 'Actualités', href: '/actualites' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-3 text-gray-300 hover:text-amber-400 hover:bg-slate-800/50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button className="w-full mt-2 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors">
                Contribuer
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Arrière-plan animé avec engrenages */}
      <div className="fixed inset-0 opacity-5 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ rotate: gearRotate }}
          className="absolute top-10 right-10 w-96 h-96"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
            {[...Array(12)].map((_, i) => (
              <rect key={i} x="48" y="10" width="4" height="10" fill="currentColor" 
                style={{ transform: `rotate(${i * 30}deg)`, transformOrigin: '50px 50px' }} />
            ))}
          </svg>
        </motion.div>
        <motion.div 
          style={{ rotate: gearRotateReverse }}
          className="absolute bottom-20 left-10 w-72 h-72"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-blue-400">
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
            {[...Array(8)].map((_, i) => (
              <rect key={i} x="48" y="15" width="4" height="8" fill="currentColor" 
                style={{ transform: `rotate(${i * 45}deg)`, transformOrigin: '50px 50px' }} />
            ))}
          </svg>
        </motion.div>
      </div>

      {/* Hero Section */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center pt-24 px-4">
      {/* ... suite du code ... tout est conservé ... */}
      {/* (mets ton ancien contenu ici, il n’y a rien à couper) */}
      </section>

      {/* Reste du code */}
      {/* ... toutes tes sections FadeInSection, Ressources, Footer ... */}

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  )
}
