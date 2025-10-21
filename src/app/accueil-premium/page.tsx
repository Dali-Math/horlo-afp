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

// --- Composant d'animation au scroll ---
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

  // --- HERO PRINCIPAL ---
  // Pas de stats ! Hero = intro + horloge + boutons
  // --------------------------------------------------
  // Le reste (Domaines, Ressources, etc.) inchangé (tu peux ajouter plus bas...)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">

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

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-xl z-50 border-b border-amber-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <motion.svg
                  viewBox="0 0 50 50"
                  className="w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <circle cx="25" cy="25" r="22" fill="none" stroke="url(#gradient)" strokeWidth="1.5" />
                  <circle cx="25" cy="25" r="18" fill="none" stroke="url(#gradient)" strokeWidth="1" opacity="0.5" />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                  </defs>
                  {[...Array(12)].map((_, i) => (
                    <line key={i} x1="25" y1="5" x2="25" y2="9" stroke="#f59e0b" strokeWidth="1"
                      style={{ transform: `rotate(${i * 30}deg)`, transformOrigin: '25px 25px' }} />
                  ))}
                </motion.svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  <span className="text-amber-400">Horlo</span>
                  <span className="text-white">Learn</span>
                </h1>
                <p className="text-xs text-amber-300/70">Passion & Découverte</p>
              </div>
            </div>

            {/* Navigation Desktop */}
            <div className="hidden md:flex items-center space-x-8 font-medium text-sm">
              {navigationLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href} 
                  className="text-gray-300 hover:text-amber-400 transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
              <button className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 font-semibold">
                <Heart className="w-4 h-4" />
                <span>Contribuer</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-amber-400">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900/95 border-t border-amber-500/20 px-4 py-4 space-y-3"
          >
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-gray-300 hover:text-amber-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg font-semibold mt-4 flex items-center justify-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Contribuer</span>
            </button>
          </motion.div>
        )}
      </nav>

      {/* HERO PRINCIPAL - intro + horloge + boutons */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Intro */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full backdrop-blur-sm"
            >
              <Radio className="w-4 h-4 text-green-400 animate-pulse" />
              <span className="text-sm text-green-300">{onlineUsers} passionnés en ligne</span>
            </motion.div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              L'horlogerie suisse{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                n'a jamais été aussi accessible
              </span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
              Explorez des ressources partagées par des passionnés pour des passionnés.
              Documents techniques, vidéos, guides pratiques — 100% gratuit.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 flex items-center justify-center"
              >
                <Sparkles className="mr-2 w-5 h-5" />
                Explorer maintenant
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-amber-400/50 rounded-full font-semibold hover:bg-amber-500/10 transition-all duration-300 flex items-center justify-center"
              >
                <Users className="mr-2 w-5 h-5" />
                Rejoindre la communauté
              </motion.button>
            </div>
            {/* Mini badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              {['100% Gratuit', 'Pas d\'inscription', 'Partage communautaire'].map((feature, i) => (
                <div key={i} className="flex items-center space-x-2 text-sm bg-slate-800/50 px-4 py-2 rounded-full border border-amber-500/20">
                  <Heart className="w-4 h-4 text-amber-400" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Horloge Interactive */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-96 h-96">
              {/* ...ton code horloge inchangé... */}
              {/* Cercles lumineux d'arrière-plan */}
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl"
              />
              {/* Cadran principal */}
              <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-full shadow-2xl border-8 border-amber-500/20 flex items-center justify-center">
                <div className="absolute inset-8 border-2 border-amber-500/10 rounded-full" />
                <div className="absolute inset-12 border border-amber-500/5 rounded-full" />
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`absolute ${i % 3 === 0 ? 'w-2 h-8 bg-amber-400' : 'w-1 h-4 bg-amber-500/50'}`}
                    style={{ 
                      transform: `rotate(${i * 30}deg) translateY(-170px)`,
                      transformOrigin: 'center'
                    }} 
                  />
                ))}
                {[12, 3, 6, 9].map((num, i) => {
                  const angle = (num === 12 ? 0 : num === 3 ? 90 : num === 6 ? 180 : 270) - 90;
                  const radian = (angle * Math.PI) / 180;
                  const x = Math.cos(radian) * 140;
                  const y = Math.sin(radian) * 140;
                  return (
                    <div 
                      key={num}
                      className="absolute text-2xl font-bold text-amber-400"
                      style={{ 
                        transform: `translate(${x}px, ${y}px)`
                      }}
                    >
                      {num}
                    </div>
                  );
                })}
                {/* Aiguilles */}
                <motion.div 
                  className="absolute w-3 h-28 bg-gradient-to-t from-amber-400 to-amber-500 rounded-full origin-bottom shadow-lg"
                  style={{ 
                    bottom: '50%',
                    left: 'calc(50% - 6px)',
                    rotate: hoursDegrees,
                  }}
                />
                <motion.div 
                  className="absolute w-2 h-36 bg-gradient-to-t from-amber-300 to-amber-400 rounded-full origin-bottom shadow-lg"
                  style={{ 
                    bottom: '50%',
                    left: 'calc(50% - 4px)',
                    rotate: minutesDegrees,
                  }}
                />
                <motion.div 
                  className="absolute w-1 h-40 bg-gradient-to-t from-red-500 to-red-400 rounded-full origin-bottom shadow-lg"
                  style={{ 
                    bottom: '50%',
                    left: 'calc(50% - 2px)',
                    rotate: secondsDegrees,
                  }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
                {/* Centre */}
                <div className="absolute w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full z-10 border-2 border-white shadow-lg" />
                <div className="absolute w-4 h-4 bg-slate-900 rounded-full z-20" />
                {/* Affichage numérique */}
                <div className="absolute bottom-24 bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-amber-500/30">
                  <span className="text-amber-400 font-mono text-sm">
                    {time.toLocaleTimeString('fr-FR')}
                  </span>
                </div>
                {/* Texte de marque */}
                <div className="absolute top-28 text-center">
                  <p className="text-amber-400 font-serif text-sm">HORLOLEARN</p>
                  <p className="text-amber-500/70 text-xs">Swiss Community</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Sections suivantes inchangées (Domaines, Ressources, Actualités, etc.) --- */}

      {/* ... met ici toutes tes autres sections sans changer la structure ... */}

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
