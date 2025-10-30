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
  Globe,
  Wand2, // ✅ nouvel import
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

  // ✅ Ressources avec l'Analyseur IA mis en avant
  const featuredResources = [
    {
      type: 'Outil IA',
      title: 'Analyseur de Montres IA',
      description:
        'Déposez une photo et obtenez une analyse détaillée : boîtier, cadran, index, aiguilles et style horloger.',
      author: 'HorloLearn',
      downloads: 'Nouveau',
      readTime: '—',
      badge: 'Ressource de la semaine',
      href: '/outils/analyseur',
    },
    {
  type: 'Vidéo',
  title: 'Montage démontage mouvement 6497',
  description:
    'Tutoriel vidéo HD : technique professionnelle de montage et démontage mouvement 6497.',
  badge: 'Populaire',
  href: 'https://www.horlolearn.ch/pratique/demontage',
},
    {
  type: 'Ressource',
  title: 'Outils de mesure en horlogerie moderne',
  description:
    'Découvrez les 10 instruments essentiels utilisés aujourd’hui pour garantir la précision du travail horloger.',
  badge: 'Nouveau',
  href: 'https://www.horlolearn.ch/outils/outils-de-mesure',
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
      <nav className="fixed top-0 w-full bg-black z-50 border-b border-gray-800">
        <div className="w-full px-8 lg:px-16">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center space-x-3 mr-auto">
              <div className="relative w-10 h-10">
                <motion.svg
                  viewBox="0 0 50 50"
                  className="w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <circle cx="25" cy="25" r="23" fill="none" stroke="#f59e0b" strokeWidth="1" />
                  {[...Array(12)].map((_, i) => (
                    <circle 
                      key={i} 
                      cx={25 + 19 * Math.cos((i * 30 - 90) * Math.PI / 180)} 
                      cy={25 + 19 * Math.sin((i * 30 - 90) * Math.PI / 180)} 
                      r="1.5" 
                      fill="#f59e0b" 
                    />
                  ))}
                </motion.svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold leading-tight">
                  <span className="text-amber-400">Horlo</span>
                  <span className="text-white">Learn</span>
                </span>
                <span className="text-xs text-gray-400 leading-tight">Passion & Découverte</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-10 flex-1 justify-center ml-12">
              {navigationLinks.map((link, index) => (
                <div 
                  key={index}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="text-white text-sm hover:text-gray-300 transition-colors duration-200 flex items-center whitespace-nowrap"
                  >
                    {link.label}
                    {link.hasDropdown && <span className="ml-1 text-xs">▼</span>}
                  </Link>

                  {link.hasDropdown && link.subLinks && openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-gray-900 border border-gray-800 rounded-lg shadow-xl py-2 z-50"
                    >
                      {link.subLinks.map((subLink, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subLink.href}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-amber-400 transition-colors duration-200"
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-gray-300 transition-colors ml-auto"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black border-t border-gray-800"
          >
            <div className="px-4 py-4 space-y-1">
              {navigationLinks.map((link, index) => (
                <div key={index}>
                  <Link
                    href={link.href}
                    onClick={() => !link.hasDropdown && setIsMenuOpen(false)}
                    className="block px-4 py-3 text-white hover:text-gray-300 hover:bg-gray-900 rounded transition-colors duration-200"
                  >
                    {link.label}
                    {link.hasDropdown && <span className="ml-2 text-xs">▼</span>}
                  </Link>
                  
                  {link.hasDropdown && link.subLinks && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.subLinks.map((subLink, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subLink.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-400 hover:text-amber-400 hover:bg-gray-900 rounded transition-colors duration-200"
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-8"
            >
              <Sparkles className="w-5 h-5 text-amber-400 mr-2" />
              <span className="text-amber-400 font-semibold text-sm">L'horlogerie suisse accessible à tous</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Passion & Découverte</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500">
                Horlogère Suisse
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Explorez librement ressources, tutoriels et savoirs horlogers partagés par des <span className="text-amber-400 font-semibold">passionnés</span> pour des <span className="text-amber-400 font-semibold">passionnés</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 flex items-center justify-center"
              >
                Commencer l'exploration
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-amber-400/50 rounded-lg font-semibold text-lg hover:bg-amber-500/10 transition-all duration-300 flex items-center justify-center"
              >
                <PlayCircle className="mr-2 w-6 h-6" />
                Voir la démo
              </motion.button>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span><span className="text-white font-semibold">{onlineUsers}</span> passionnés en ligne</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Heart className="w-5 h-5 text-red-400" />
                <span className="text-white font-semibold">100% Gratuit</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <span className="text-2xl">🇨🇭</span>
                <span>Made in Switzerland</span>
              </div>
            </div>
          </motion.div>

          {/* Horloge interactive */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-96 h-96">
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl"
              />
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
                {[12, 3, 6, 9].map((num) => {
                  const angle = (num === 12 ? 0 : num === 3 ? 90 : num === 6 ? 180 : 270) - 90;
                  const rad = (angle * Math.PI) / 180;
                  const x = Math.cos(rad) * 140;
                  const y = Math.sin(rad) * 140;
                  return (
                    <div 
                      key={num}
                      className="absolute text-2xl font-bold text-amber-400"
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                    >
                      {num}
                    </div>
                  );
                })}
                <motion.div 
                  className="absolute w-3 h-28 bg-gradient-to-t from-amber-400 to-amber-500 rounded-full origin-bottom shadow-lg"
                  style={{ bottom: '50%', left: 'calc(50% - 6px)', rotate: hoursDegrees }}
                />
                <motion.div 
                  className="absolute w-2 h-36 bg-gradient-to-t from-amber-300 to-amber-400 rounded-full origin-bottom shadow-lg"
                  style={{ bottom: '50%', left: 'calc(50% - 4px)', rotate: minutesDegrees }}
                />
                <motion.div 
                  className="absolute w-1 h-40 bg-gradient-to-t from-red-500 to-red-400 rounded-full origin-bottom shadow-lg"
                  style={{ bottom: '50%', left: 'calc(50% - 2px)', rotate: secondsDegrees }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
                <div className="absolute w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full z-10 border-2 border-white shadow-lg" />
                <div className="absolute w-4 h-4 bg-slate-900 rounded-full z-20" />
                <div className="absolute bottom-24 bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-amber-500/30">
                  <span className="text-amber-400 font-mono text-sm">
                    {time.toLocaleTimeString('fr-FR')}
                  </span>
                </div>
                <div className="absolute top-28 text-center">
                  <p className="text-amber-400 font-serif text-sm">HORLOLEARN</p>
                  <p className="text-amber-500/70 text-xs">Swiss Community</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronRight className="w-8 h-8 text-amber-400 rotate-90" />
        </motion.div>
      </section>

      {/* Intro */}
      <FadeInSection id="theorie" className="py-32 text-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-8">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-300">Bienvenue dans l'univers horloger</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
            Le Temps à l'État Pur
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed">
            Plongez dans l'univers fascinant de l'horlogerie. Explorez l'histoire,
            maîtrisez les techniques, et découvrez les secrets de ces merveilles
            mécaniques qui battent au rythme du temps.
          </p>
        </div>
      </FadeInSection>

      {/* Ressources Phares */}
      <FadeInSection id="ressources" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ressources <span className="text-amber-400">Phares</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Découvrez nos contenus les plus appréciés par la communauté
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl overflow-hidden border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-amber-500/90 text-white text-xs font-bold rounded-full">
                    {resource.badge}
                  </span>
                </div>

                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                      {resource.type === 'Outil IA' ? (
                        <Wand2 className="w-6 h-6 text-white" />
                      ) : (
                        <FileText className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <span className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                      {resource.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-amber-400 transition-colors">
                    {resource.title}
                  </h3>

                  <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {resource.author}
                    </span>
                    <span>{resource.readTime}</span>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-amber-500/10">
                    <div className="flex items-center text-sm text-gray-400">
                      <Download className="w-4 h-4 mr-2 text-amber-400" />
                      {resource.downloads} téléchargements
                    </div>
                    {/* ✅ Lien “Voir” qui utilise resource.href */}
                    <Link
                      href={resource.href ?? '#'}
                      className="text-amber-400 font-semibold hover:text-amber-300 transition-colors flex items-center"
                    >
                      Voir <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* Thématiques */}
      <FadeInSection id="communaute" className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Explorez par <span className="text-amber-400">Thématique</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Une bibliothèque vivante organisée pour votre apprentissage
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {thematiques.map((theme, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.color} opacity-10 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300`} />
                
                <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-8 border border-amber-500/10 group-hover:border-amber-500/30 transition-all duration-300 backdrop-blur-sm">
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

      {/* Actualités */}
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

      {/* Newsletter */}
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
        html { scroll-behavior: smooth; }
        body { margin: 0; padding: 0; }
      `}</style>
    </div>
  )
}
