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

// --- Page Principale ---
export default function HorloLearnHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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

      {/* Hero Section */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center pt-20 px-4">
        
        {/* Effets lumineux */}
        <div className="absolute inset-0">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Texte Hero */}
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
              Explorez <span className="text-amber-400 font-bold">2,500+ ressources</span> partagées par des passionnés pour des passionnés. 
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
              
              {/* Cercles lumineux d'arrière-plan */}
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl"
              />
              
              {/* Cadran principal */}
              <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-full shadow-2xl border-8 border-amber-500/20 flex items-center justify-center">
                
                {/* Anneaux décoratifs */}
                <div className="absolute inset-8 border-2 border-amber-500/10 rounded-full" />
                <div className="absolute inset-12 border border-amber-500/5 rounded-full" />
                
                {/* Marqueurs d'heures */}
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

                {/* Chiffres aux positions principales */}
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

      {/* Section Statistiques - NOUVEAU DESIGN SELON L'IMAGE */}
      <FadeInSection className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          {/* Bordure rose elliptique */}
          <div className="relative">
            {/* Ellipse avec bordure rose/magenta */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="border-4 border-pink-600/60 rounded-[50%] w-full h-full"
                style={{
                  borderRadius: '50% / 35%',
                  transform: 'rotate(-2deg)'
                }}
              />
            </div>

            {/* Contenu des statistiques */}
            <div className="relative z-10 py-16">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center group cursor-pointer"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-900/30 backdrop-blur-sm rounded-2xl mb-4 group-hover:scale-110 transition-transform border border-amber-500/20">
                      <stat.icon className="w-8 h-8 text-amber-400" />
                    </div>
                    <div className="text-4xl font-bold text-amber-400 mb-2 group-hover:scale-110 transition-transform">
                      {stat.value}
                    </div>
                    <p className="text-gray-300 text-sm font-medium">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Section Ressources Featured */}
      <FadeInSection id="ressources" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-amber-400 font-semibold tracking-wider uppercase text-sm"
            >
              Ressources Populaires
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Partagées par la <span className="text-amber-400">Communauté</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Des documents techniques de qualité professionnelle, gratuits et accessibles à tous
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl overflow-hidden border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="relative p-8">
                  {/* Badge + Type */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-xs font-bold text-amber-300">
                      {resource.badge}
                    </span>
                    <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs font-bold text-blue-300">
                      {resource.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-amber-400 transition-colors">
                    {resource.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {resource.description}
                  </p>

                  <div className="space-y-3 mb-6 text-sm text-gray-500">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-amber-400" />
                        <span>Par {resource.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-2 text-green-400" />
                        <span>{resource.downloads}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-amber-400" />
                      <span>Lecture : {resource.readTime}</span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 flex items-center justify-center group/btn">
                    <Download className="mr-2 w-5 h-5 group-hover/btn:translate-y-1 transition-transform" />
                    Télécharger gratuitement
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-4 border-2 border-amber-400/50 rounded-full font-semibold hover:bg-amber-500/10 transition-all duration-300 inline-flex items-center">
              Voir toutes les ressources
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </FadeInSection>

      {/* Section Thématiques */}
      <FadeInSection className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Explorer par <span className="text-amber-400">Thématique</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Des ressources organisées pour progresser à votre rythme
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {thematiques.map((theme, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative z-10">
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

                  <button className="w-full py-3 border-2 border-amber-400/50 rounded-lg font-semibold hover:bg-amber-500/10 transition-all duration-300">
                    Découvrir
                  </button>
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
            <button className="hidden md:block text-amber-400 font-semibold hover:text-amber-300 transition-colors flex items-center">
              Voir tout <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {actualites.map((news, index) => (
              <motion.div
                key={index}
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
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* Section Newsletter */}
      <FadeInSection className="py-20 px-4 bg-slate-900/30">
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
