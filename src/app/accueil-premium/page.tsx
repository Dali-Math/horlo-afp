'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { 
  Clock, Watch, BookOpen, Award, Heart, ChevronRight, Users, Share2,
  PlayCircle, TrendingUp, Sparkles, ArrowRight, Globe, Zap, Star,
  BookMarked, Trophy, Compass, Target, Lightbulb, Coffee, Eye, Shield,
  Moon, Sun
} from 'lucide-react'

// ============================================================================
// COMPOSANTS RÉUTILISABLES
// ============================================================================

const FadeInSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const StatCard = ({ icon: Icon, value, label, delay = 0 }: any) => {
  const { theme } = useTheme()
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`relative group p-8 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-slate-900/50 border-amber-500/20 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/20' 
          : 'bg-white/70 border-amber-300/30 hover:border-amber-400/60 hover:shadow-xl hover:shadow-amber-300/30'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <Icon className="w-12 h-12 text-amber-400 mb-4 relative z-10" />
      <motion.h3 
        className="text-4xl font-bold mb-2 relative z-10 text-amber-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
      >
        {value}
      </motion.h3>
      <p className={`text-sm font-medium relative z-10 ${
        theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
      }`}>
        {label}
      </p>
    </motion.div>
  )
}

const FeatureCard = ({ icon: Icon, title, description, link, delay = 0 }: any) => {
  const { theme } = useTheme()
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03, y: -8 }}
      className="group"
    >
      <Link href={link}>
        <div className={`relative h-full p-8 rounded-2xl backdrop-blur-xl border transition-all duration-300 overflow-hidden ${
          theme === 'dark'
            ? 'bg-slate-900/50 border-slate-700/50 hover:border-amber-500/50'
            : 'bg-white/80 border-slate-200 hover:border-amber-400/50'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-amber-500/10 group-hover:bg-amber-500/20'
                : 'bg-amber-100 group-hover:bg-amber-200'
            }`}>
              <Icon className="w-8 h-8 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>

            <h3 className={`text-2xl font-bold mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              {title}
            </h3>

            <p className={`mb-6 leading-relaxed ${
              theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
            }`}>
              {description}
            </p>

            <div className="flex items-center text-amber-400 font-semibold group-hover:translate-x-2 transition-transform">
              Explorer
              <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ============================================================================
// COMPOSANT HORLOGE INTERACTIVE AVANCÉE
// ============================================================================

const InteractiveWatch = () => {
  const { theme } = useTheme()
  const [time, setTime] = useState(new Date())
  const [is24Hour, setIs24Hour] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const seconds = time.getSeconds()
  const minutes = time.getMinutes()
  const hours = time.getHours()

  const secondsDeg = (seconds / 60) * 360
  const minutesDeg = ((minutes + seconds / 60) / 60) * 360
  const hoursDeg = ((hours % 12 + minutes / 60) / 12) * 360

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative w-full max-w-md mx-auto"
    >
      {/* Aura lumineuse */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 rounded-full blur-3xl"
      />

      {/* Corps de l'horloge */}
      <div className="relative w-full aspect-square">
        <div className={`absolute inset-0 rounded-full shadow-2xl backdrop-blur-xl border-8 transition-all duration-500 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border-amber-500/30'
            : 'bg-gradient-to-br from-white via-slate-50 to-slate-100 border-amber-400/40'
        }`}>
          {/* Cercles concentriques */}
          <div className="absolute inset-8 border-2 border-amber-500/10 rounded-full" />
          <div className="absolute inset-12 border border-amber-500/5 rounded-full" />

          {/* Marques d'heures */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute ${i % 3 === 0 ? 'w-1.5 h-10 bg-gradient-to-b from-amber-400 to-amber-500' : 'w-0.5 h-6 bg-amber-500/60'}`}
              style={{
                transform: `rotate(${i * 30}deg) translateY(-44%)`,
                transformOrigin: 'center',
                left: 'calc(50% - 3px)',
                top: '50%'
              }}
            />
          ))}

          {/* Chiffres */}
          {[12, 3, 6, 9].map((num) => {
            const angle = (num === 12 ? 0 : num === 3 ? 90 : num === 6 ? 180 : 270) - 90
            const rad = (angle * Math.PI) / 180
            const distance = 38
            const x = Math.cos(rad) * distance
            const y = Math.sin(rad) * distance
            
            return (
              <div
                key={num}
                className="absolute text-2xl font-bold text-amber-400 select-none"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}%), calc(-50% + ${y}%))`
                }}
              >
                {num}
              </div>
            )
          })}

          {/* Aiguille des heures */}
          <motion.div
            className="absolute w-2 h-24 bg-gradient-to-t from-amber-500 to-amber-400 rounded-full origin-bottom shadow-lg"
            style={{
              bottom: '50%',
              left: 'calc(50% - 4px)',
              rotate: hoursDeg
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          {/* Aiguille des minutes */}
          <motion.div
            className="absolute w-1.5 h-32 bg-gradient-to-t from-amber-400 to-amber-300 rounded-full origin-bottom shadow-lg"
            style={{
              bottom: '50%',
              left: 'calc(50% - 3px)',
              rotate: minutesDeg
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          {/* Aiguille des secondes */}
          <motion.div
            className="absolute w-0.5 h-36 bg-gradient-to-t from-red-500 to-red-400 rounded-full origin-bottom shadow-lg"
            style={{
              bottom: '50%',
              left: 'calc(50% - 1px)',
              rotate: secondsDeg
            }}
            transition={{ ease: "linear", duration: 0.05 }}
          />

          {/* Centre */}
          <div className="absolute w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full z-10 border-2 border-white shadow-lg"
               style={{ left: 'calc(50% - 12px)', top: 'calc(50% - 12px)' }} />
          <div className="absolute w-4 h-4 bg-slate-900 rounded-full z-20"
               style={{ left: 'calc(50% - 8px)', top: 'calc(50% - 8px)' }} />

          {/* Affichage numérique */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`absolute bottom-20 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl border backdrop-blur-md ${
              theme === 'dark'
                ? 'bg-slate-900/80 border-amber-500/30'
                : 'bg-white/80 border-amber-400/30'
            }`}
          >
            <div className="text-amber-400 font-mono text-lg font-bold text-center">
              {time.toLocaleTimeString('fr-FR', { 
                hour12: !is24Hour,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
          </motion.div>

          {/* Marque HorloLearn */}
          <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center">
            <p className="text-amber-400 font-serif text-base font-bold tracking-wider">HORLOLEARN</p>
            <p className="text-amber-500/70 text-xs mt-1">Swiss Excellence</p>
          </div>
        </div>
      </div>

      {/* Toggle 12/24h */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIs24Hour(!is24Hour)}
        className={`mt-6 mx-auto block px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
          theme === 'dark'
            ? 'bg-slate-800 hover:bg-slate-700 text-amber-400'
            : 'bg-slate-100 hover:bg-slate-200 text-amber-600'
        }`}
      >
        {is24Hour ? '24H' : '12H'} Format
      </motion.button>
    </motion.div>
  )
}

// ============================================================================
// BOUTON TOGGLE THÈME
// ============================================================================

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 180 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`fixed top-6 right-6 z-50 p-4 rounded-full backdrop-blur-xl border shadow-lg transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-slate-900/50 border-amber-500/30 hover:border-amber-500/60'
          : 'bg-white/70 border-amber-300/30 hover:border-amber-400/60'
      }`}
      aria-label="Changer le thème"
    >
      <AnimatePresence mode="wait">
        {theme === 'dark' ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-6 h-6 text-amber-400" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-6 h-6 text-slate-700" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

// ============================================================================
// PAGE PRINCIPALE
// ============================================================================

export default function HorloLearnHomePage() {
  const { theme } = useTheme()
  const { scrollYProgress } = useScroll()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const gearRotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const gearRotateReverse = useTransform(scrollYProgress, [0, 1], [360, 0])

  if (!mounted) return null

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      theme === 'dark'
        ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white'
        : 'bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900'
    }`}>
      
      {/* Toggle thème */}
      <ThemeToggle />

      {/* Arrière-plan animé */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        <motion.div style={{ rotate: gearRotate }} className="absolute top-10 right-10 w-96 h-96">
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
            {[...Array(12)].map((_, i) => (
              <rect key={i} x="48" y="10" width="4" height="10" fill="currentColor"
                style={{ transform: `rotate(${i * 30}deg)`, transformOrigin: '50px 50px' }} />
            ))}
          </svg>
        </motion.div>
        <motion.div style={{ rotate: gearRotateReverse }} className="absolute bottom-20 left-10 w-72 h-72">
          <svg viewBox="0 0 100 100" className="w-full h-full text-blue-400">
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
            {[...Array(8)].map((_, i) => (
              <rect key={i} x="48" y="15" width="4" height="8" fill="currentColor"
                style={{ transform: `rotate(${i * 45}deg)`, transformOrigin: '50px 50px' }} />
            ))}
          </svg>
        </motion.div>
      </div>

      {/* ======================== HERO SECTION ======================== */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Contenu texte */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`inline-flex items-center px-5 py-2.5 rounded-full mb-8 backdrop-blur-sm ${
                theme === 'dark'
                  ? 'bg-amber-500/10 border border-amber-500/30'
                  : 'bg-amber-100 border border-amber-300'
              }`}
            >
              <Sparkles className="w-5 h-5 text-amber-400 mr-2 animate-pulse" />
              <span className="text-amber-400 font-bold text-sm tracking-wide">
                La Référence Mondiale en Horlogerie Suisse
              </span>
            </motion.div>

            {/* Titre */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-[1.1]">
              <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>
                Excellence &
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 animate-gradient">
                Passion Horlogère
              </span>
            </h1>

            {/* Description */}
            <p className={`text-xl md:text-2xl mb-10 leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
            }`}>
              La plateforme <span className="text-amber-400 font-bold">premium</span> pour maîtriser l'art de l'horlogerie suisse. 
              Du <span className="text-amber-400 font-semibold">novice</span> à l'<span className="text-amber-400 font-semibold">expert</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(251, 146, 60, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-5 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 rounded-xl font-bold text-lg shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 flex items-center justify-center relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Commencer Maintenant
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-10 py-5 border-2 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center ${
                  theme === 'dark'
                    ? 'border-amber-500/50 hover:bg-amber-500/10 hover:border-amber-400'
                    : 'border-amber-400/60 hover:bg-amber-50 hover:border-amber-500'
                }`}
              >
                <PlayCircle className="mr-3 w-6 h-6" />
                Voir la Démo
              </motion.button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-8 text-sm">
              <div className={`flex items-center space-x-3 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                <span><span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>2,847</span> passionnés en ligne</span>
              </div>
              <div className={`flex items-center space-x-3 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                <Heart className="w-6 h-6 text-red-400" />
                <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>100% Gratuit & Open Source</span>
              </div>
              <div className={`flex items-center space-x-3 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                <span className="text-3xl">🇨🇭</span>
                <span className="font-semibold">Made with ❤️ in Switzerland</span>
              </div>
            </div>
          </motion.div>

          {/* Horloge interactive */}
          <InteractiveWatch />
        </div>

        {/* Indicateur de scroll */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: [0.5, 1, 0.5], y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronRight className="w-10 h-10 text-amber-400 rotate-90" />
        </motion.div>
      </section>

      {/* ======================== STATS SECTION ======================== */}
      <FadeInSection className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard icon={Users} value="15K+" label="Membres Actifs" delay={0} />
            <StatCard icon={BookOpen} value="500+" label="Ressources Premium" delay={0.1} />
            <StatCard icon={Award} value="98%" label="Satisfaction" delay={0.2} />
            <StatCard icon={Globe} value="45" label="Pays Représentés" delay={0.3} />
          </div>
        </div>
      </FadeInSection>

      {/* ======================== INTRO SECTION ======================== */}
      <FadeInSection className={`py-32 px-4 ${
        theme === 'dark' ? 'bg-slate-900/30' : 'bg-slate-100/50'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full mb-10 backdrop-blur-sm"
          >
            <Clock className="w-6 h-6 text-amber-400" />
            <span className="text-amber-300 font-semibold">Plongez dans l'univers horloger</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500"
          >
            Le Temps à l'État d'Art
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-xl md:text-2xl leading-relaxed mb-10 ${
              theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
            }`}
          >
            Découvrez les <span className="text-amber-400 font-bold">secrets millénaires</span> de l'horlogerie,
            maîtrisez les <span className="text-amber-400 font-bold">techniques ancestrales</span>,
            et rejoignez une communauté d'<span className="text-amber-400 font-bold">excellence</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              { icon: Shield, text: "Certifié & Validé" },
              { icon: Star, text: "Qualité Premium" },
              { icon: Zap, text: "Mise à jour constante" }
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center space-x-2 px-5 py-3 rounded-full backdrop-blur-sm ${
                  theme === 'dark'
                    ? 'bg-slate-800/50 border border-slate-700'
                    : 'bg-white border border-slate-200'
                }`}
              >
                <item.icon className="w-5 h-5 text-amber-400" />
                <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                  {item.text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </FadeInSection>

      {/* ======================== FEATURES GRID ======================== */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeInSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>Votre Parcours </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                vers l'Excellence
              </span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
            }`}>
              Un écosystème complet pour apprendre, pratiquer et maîtriser tous les aspects de l'horlogerie suisse
            </p>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={BookMarked}
              title="Théorie Complète"
              description="Cours détaillés sur l'histoire, les mécanismes et les techniques horlogères, du niveau débutant à expert."
              link="/theorie"
              delay={0}
            />
            <FeatureCard
              icon={Target}
              title="Pratique Guidée"
              description="Tutoriels pas-à-pas, démontages virtuels et exercices pratiques pour maîtriser chaque geste."
              link="/pratique"
              delay={0.1}
            />
            <FeatureCard
              icon={Trophy}
              title="Quiz & Certification"
              description="Testez vos connaissances et obtenez des certifications reconnues par la communauté horlogère."
              link="/quiz"
              delay={0.2}
            />
            <FeatureCard
              icon={Compass}
              title="Culture Horlogère"
              description="Plongez dans l'histoire fascinante des manufactures suisses et des grandes innovations."
              link="/culture"
              delay={0.3}
            />
            <FeatureCard
              icon={Lightbulb}
              title="Outils Pro"
              description="Calculateurs, simulateurs et outils de conception pour vos projets horlogers."
              link="/outils"
              delay={0.4}
            />
            <FeatureCard
              icon={Coffee}
              title="Communauté"
              description="Échangez avec des passionnés, partagez vos créations et participez aux événements."
              link="/communaute"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* ======================== CTA FINAL ======================== */}
      <FadeInSection className={`py-32 px-4 ${
        theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-slate-100 via-white to-slate-100'
      }`}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl p-12 md:p-16 text-center overflow-hidden"
            style={{
              background: theme === 'dark' 
                ? 'linear-gradient(135deg, rgba(251, 146, 60, 0.1), rgba(249, 115, 22, 0.1))'
                : 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(251, 146, 60, 0.2))'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent animate-pulse" />
            
            <div className="relative z-10">
              <Globe className="w-16 h-16 text-amber-400 mx-auto mb-8 animate-pulse" />
              
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                Rejoignez l'Élite Horlogère
              </h2>
              
              <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto ${
                theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
              }`}>
                Recevez chaque semaine les <span className="text-amber-400 font-bold">nouvelles ressources</span>, 
                les <span className="text-amber-400 font-bold">techniques avancées</span> et 
                les <span className="text-amber-400 font-bold">actualités exclusives</span>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className={`flex-1 rounded-xl px-6 py-5 text-lg focus:outline-none focus:ring-4 focus:ring-amber-500/50 transition-all ${
                    theme === 'dark'
                      ? 'bg-slate-900/70 border-2 border-amber-500/30 text-white placeholder-gray-500'
                      : 'bg-white border-2 border-amber-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 whitespace-nowrap"
                >
                  S'Abonner Gratuitement
                </motion.button>
              </div>

              <div className={`flex flex-wrap items-center justify-center gap-8 text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
              }`}>
                <span className="flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-amber-400" />
                  Aucun spam, promis
                </span>
                <span className="flex items-center">
                  <Share2 className="w-5 h-5 mr-2 text-green-400" />
                  15K+ abonnés satisfaits
                </span>
                <span className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-400" />
                  Données 100% sécurisées
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Scroll to top */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollYProgress.get() > 0.2 ? 1 : 0 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`p-4 rounded-full backdrop-blur-xl border shadow-2xl transition-all ${
            theme === 'dark'
              ? 'bg-slate-900/50 border-amber-500/30 hover:border-amber-500/60'
              : 'bg-white/70 border-amber-300/30 hover:border-amber-400/60'
          }`}
          aria-label="Retour en haut"
        >
          <ChevronRight className="w-6 h-6 text-amber-400 -rotate-90" />
        </motion.button>
      </motion.div>

      {/* Styles globaux */}
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  )
}
