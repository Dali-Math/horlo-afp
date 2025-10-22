
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

// --- Page Principale ---
export default function HorloLearnHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [time, setTime] = useState(new Date())
  const [onlineUsers] = useState(48)
  const { scrollYProgress } = useScroll()
  
  const gearRotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const gearRotateReverse = useTransform(scrollYProgress, [0, 1], [0, -360])

  // Mise à jour de l'horloge
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const secondsDegrees = (time.getSeconds() / 60) * 360
  const minutesDegrees = ((time.getMinutes() + time.getSeconds() / 60) / 60) * 360
  const hoursDegrees = ((time.getHours() % 12 + time.getMinutes() / 60) / 12) * 360

  const navigationLinks = [
    { 
      label: 'Théorie', 
      href: '/theorie', 
      hasDropdown: true,
      subLinks: [
        { label: 'Lecture de plan', href: '/theorie/lecture-de-plan' },
      ]
    },
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
      resources: '850+',
      link: '/theorie'
    },
    {
      icon: '🔧',
      title: 'Pratique',
      description: 'Démontage, remontage et réglage de mouvements',
      items: ['Tutoriels vidéo', 'Plans techniques', 'Guides pas-à-pas'],
      color: 'from-amber-500 to-orange-500',
      resources: '1,200+',
      link: '/pratique'
    },
    {
      icon: '✅',
      title: 'Évaluation',
      description: 'Testez vos connaissances avec nos quiz interactifs',
      items: ['Quiz interactifs', 'Correction détaillée', 'Suivi progrès'],
      color: 'from-green-500 to-emerald-500',
      resources: '450+',
      link: '/quiz'
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
      description: 'Guide pas-à-pas avec photos et conseils d\'expert',
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-amber-500/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <Watch className="w-8 h-8 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-2xl font-bold">
                <span className="text-amber-400">Horlo</span>
                <span className="text-white">Learn</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationLinks.map((link, index) => (
                <div key={index} className="relative group">
                  {link.hasDropdown ? (
                    <>
                      <button 
                        className="px-4 py-2 text-gray-300 hover:text-amber-400 transition-colors duration-200 font-medium"
                        onMouseEnter={() => setOpenDropdown(link.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        {link.label}
                      </button>
                      {openDropdown === link.label && (
                        <div 
                          className="absolute top-full left-0 mt-2 bg-slate-900/95 backdrop-blur-lg border border-amber-500/20 rounded-lg shadow-2xl py-2 min-w-[200px]"
                          onMouseEnter={() => setOpenDropdown(link.label)}
                          onMouseLeave={() => setOpenDropdown(null)}
                        >
                          {link.subLinks?.map((subLink, subIndex) => (
                            <Link 
                              key={subIndex}
                              href={subLink.href}
                              className="block px-4 py-2 text-gray-300 hover:text-amber-400 hover:bg-amber-500/5 transition-colors duration-200"
                            >
                              {subLink.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link 
                      href={link.href}
                      className="px-4 py-2 text-gray-300 hover:text-amber-400 transition-colors duration-200 font-medium"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-green-300">{onlineUsers} en ligne</span>
              </div>
              <Link href="/contribuer" className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300">
                Contribuer
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:hidden mt-4 pb-4 border-t border-amber-500/10 pt-4"
            >
              <div className="space-y-2">
                {navigationLinks.map((link, index) => (
                  <Link 
                    key={index}
                    href={link.href}
                    className="block px-4 py-2 text-gray-300 hover:text-amber-400 hover:bg-amber-500/5 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link 
                  href="/contribuer"
                  className="block px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg font-semibold text-center mt-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contribuer
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Contenu Gauche */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-6"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-semibold text-amber-300">Plateforme Communautaire Suisse</span>
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">Maîtrisez l'</span>
                <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                  Horlogerie
                </span>
              </h1>

              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Accédez gratuitement à <span className="text-amber-400 font-semibold">2,500+ ressources</span> partagées 
                par la communauté : tutoriels, plans techniques, vidéos et bien plus.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/ressources" className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg font-semibold hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 text-center">
                  Explorer les Ressources
                </Link>
                <Link href="/contribuer" className="px-8 py-4 border-2 border-amber-400/50 rounded-lg font-semibold hover:bg-amber-500/10 transition-all duration-300 text-center">
                  Rejoindre la Communauté
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.slice(0, 2).map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 rounded-lg p-4 border border-amber-500/10"
                  >
                    <stat.icon className="w-6 h-6 text-amber-400 mb-2" />
                    <div className="text-2xl font-bold text-amber-400">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Horloge Interactive Droite */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative w-96 h-96 mx-auto">
                {/* Cercle externe lumineux */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" />
                
                {/* Cadran principal */}
                <div className="relative w-full h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-full border-4 border-amber-500/30 shadow-2xl backdrop-blur-sm">
                  
                  {/* Marques horaires */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-1 h-4 bg-amber-400"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-170px)`,
                        transformOrigin: 'center',
                      }}
                    />
                  ))}

                  {/* Centre */}
                  <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-amber-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-lg shadow-amber-500/50" />

                  {/* Aiguille des heures */}
                  <div
                    className="absolute top-1/2 left-1/2 w-2 h-24 bg-gradient-to-t from-amber-400 to-amber-500 rounded-full origin-bottom shadow-lg"
                    style={{
                      transform: `translate(-50%, -100%) rotate(${hoursDegrees}deg)`,
                      transformOrigin: 'bottom center',
                    }}
                  />

                  {/* Aiguille des minutes */}
                  <div
                    className="absolute top-1/2 left-1/2 w-1.5 h-32 bg-gradient-to-t from-gray-300 to-white rounded-full origin-bottom shadow-lg"
                    style={{
                      transform: `translate(-50%, -100%) rotate(${minutesDegrees}deg)`,
                      transformOrigin: 'bottom center',
                    }}
                  />

                  {/* Aiguille des secondes */}
                  <div
                    className="absolute top-1/2 left-1/2 w-0.5 h-36 bg-red-500 rounded-full origin-bottom shadow-lg"
                    style={{
                      transform: `translate(-50%, -100%) rotate(${secondsDegrees}deg)`,
                      transformOrigin: 'bottom center',
                    }}
                  />
                </div>

                {/* Heure digitale */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-xl border border-amber-500/30">
                  <div className="text-2xl font-mono text-amber-400">
                    {time.toLocaleTimeString('fr-CH')}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Section Stats */}
      <FadeInSection className="py-12 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 rounded-xl p-6 border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 text-center group"
              >
                <stat.icon className="w-10 h-10 text-amber-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold text-amber-400 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* Section Ressources Vedettes */}
      <FadeInSection id="ressources" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-amber-400">Ressources</span> de la Semaine
            </h2>
            <p className="text-gray-400 text-lg">Les contributions les plus populaires de la communauté</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 rounded-xl p-6 border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs font-bold text-blue-300">
                    {resource.type}
                  </span>
                  <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-xs font-bold text-amber-300">
                    {resource.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-amber-400 transition-colors">
                  {resource.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-amber-500/10">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-xs font-bold">
                      {resource.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs text-gray-300 font-medium">{resource.author}</div>
                      <div className="text-xs text-gray-500">{resource.readTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Download className="w-4 h-4" />
                    <span className="text-sm">{resource.downloads}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/ressources" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg font-semibold hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300">
              Voir Toutes les Ressources
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* Section Thématiques */}
      <FadeInSection id="thematiques" className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Explorer par <span className="text-amber-400">Thématique</span>
            </h2>
            <p className="text-gray-400 text-lg">Découvrez nos contenus organisés par domaine d'expertise</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {thematiques.map((theme, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-5xl">{theme.icon}</div>
                    <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-xs font-bold text-amber-300">
                      {theme.resources}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-amber-400">{theme.title}</h3>
                  <p className="text-gray-400 mb-6">{theme.description}</p>

                  <ul className="space-y-2 mb-6">
                    {theme.items.map((item, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-300">
                        <ChevronRight className="w-4 h-4 mr-2 text-amber-400" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link href={theme.link} className="block w-full py-3 border-2 border-amber-400/50 rounded-lg font-semibold hover:bg-amber-500/10 transition-all duration-300 text-center">
                    Découvrir
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* Section Actualités */}
      <FadeInSection id="actualites" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-amber-400">Actualités</span> Horlogères
              </h2>
              <p className="text-gray-400">Restez informé des dernières nouveautés</p>
            </div>
            <Link href="/evenements" className="hidden md:block text-amber-400 font-semibold hover:text-amber-300 transition-colors flex items-center">
              Voir tout <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {actualites.map((news, index) => {
              // Définir le lien selon la catégorie
              const categoryLinks: Record<string, string> = {
                'Événement': '/evenements',
                'Innovation': '/actualites/innovations',
                'Formation': '/actualites/formations'
              };

              const link = categoryLinks[news.category] || '/evenements';

              return (
                <Link href={link} key={index}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 rounded-xl p-6 border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 cursor-pointer group"
                  >
                    <span className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-xs font-bold text-amber-300 mb-4">
                      {news.category}
                    </span>
                    <h3 className="text-lg font-bold mb-3 text-white group-hover:text-amber-400 transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-sm text-gray-500">{news.time}</p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </FadeInSection>

      {/* Section Newsletter */}
      <FadeInSection id="contribuer" className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 rounded-3xl p-12 border border-amber-500/30 overflow-hidden text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent animate-pulse" />
            
            <div className="relative z-10">
              <Globe className="w-12 h-12 text-amber-400 mx-auto mb-6" />
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Restez Informé
              </h2>
              
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Recevez chaque semaine : nouvelles ressources partagées, astuces d'atelier et actualités horlogères
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 bg-slate-900/50 border border-amber-500/30 rounded-lg px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors backdrop-blur-sm"
                />
                <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg font-semibold hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 whitespace-nowrap">
                  S'Abonner
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-400">
                <span className="flex items-center">
                  <Share2 className="w-4 h-4 mr-2 text-amber-400" />
                  Flux RSS disponible
                </span>
                <span className="flex items-center">
                  <Radio className="w-4 h-4 mr-2 text-green-400" />
                  Notifications activables
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Footer */}
      <footer className="relative border-t border-amber-500/10 bg-slate-950/50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Watch className="w-6 h-6 text-amber-400" />
                <span className="text-xl font-bold">
                  <span className="text-amber-400">Horlo</span>
                  <span className="text-white">Learn</span>
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-6">
                Plateforme communautaire de partage de ressources horlogères. Par des passionnés, pour des passionnés.
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-gray-400">100% Gratuit & Collaboratif</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-amber-400 mb-6 uppercase tracking-wider text-sm">Explorer</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {['Théorie', 'Pratique', 'Évaluation', 'Actualités'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-amber-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-amber-400 mb-6 uppercase tracking-wider text-sm">Communauté</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {['Forum', 'Contribuer', 'Discord', 'Newsletter'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-amber-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-amber-400 mb-6 uppercase tracking-wider text-sm">Légal</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {['CGU', 'Confidentialité', 'Mentions légales', 'Contact'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-amber-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-amber-500/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© 2025 HorloLearn. Projet communautaire open-source 🇨🇭</p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span>Fait avec</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>par la communauté horlogère</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Styles globaux */}
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
