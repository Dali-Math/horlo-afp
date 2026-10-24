// src/app/HomePageClient.tsx

'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'
import { 
  Clock, Watch, BookOpen, Award, Heart, ChevronRight, Menu, X, Users, Share2,
  Download, PlayCircle, FileText, TrendingUp, Sparkles, ArrowRight, Radio, Globe, Wand2,
} from 'lucide-react'

// Importation des données depuis notre fichier central
import { stats, thematiques, featuredResources, actualites } from '@/lib/homepageData'

// --- IMPORTATION DYNAMIQUE DES SECTIONS ---
const RessourcesPharesSection = dynamic(() => import('@/components/RessourcesPharesSection'), {
  loading: () => <p className="text-center text-gray-500">Chargement des ressources...</p>,
})

const ThematiquesSection = dynamic(() => import('@/components/ThematiquesSection'), {
  loading: () => <p className="text-center text-gray-500">Chargement des thématiques...</p>,
})

const LuxuryHeroClock = dynamic(() => import('@/components/LuxuryHeroClock'), {
  ssr: false,
  loading: () => (
    <div className="w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 rounded-full bg-slate-900/60 border border-amber-500/20 animate-pulse flex items-center justify-center">
      <span className="text-amber-400 font-mono text-xs tracking-widest">CHRONOMÈTRE SUISSE...</span>
    </div>
  ),
});

const ActualitesSection = dynamic(() => import('@/components/ActualitesSection'), {
  loading: () => <p className="text-center text-gray-500">Chargement des actualités...</p>,
})

// --- Composant d'animation au scroll ---
const FadeInSection = ({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px" })

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
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState<Date>(new Date(0))
  const { scrollYProgress } = useScroll()
  
  const gearRotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const gearRotateReverse = useTransform(scrollYProgress, [0, 1], [0, -360])

  useEffect(() => {
    setMounted(true)
    setTime(new Date())
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const secondsDegrees = mounted ? (time.getSeconds() / 60) * 360 : 0
  const minutesDegrees = mounted ? ((time.getMinutes() + time.getSeconds() / 60) / 60) * 360 : 0
  const hoursDegrees = mounted ? (((time.getHours() % 12) + time.getMinutes() / 60) / 12) * 360 : 0

  return (
    // Style Sombre Permanent Haute Horlogerie (Prestige Suisse)
    <div className="min-h-screen overflow-hidden bg-slate-50 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      
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
      <section id="accueil" className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center px-4 py-2 rounded-full mb-8 bg-amber-500/10 border border-amber-500/20"
            >
              <Watch className="w-4 h-4 text-amber-600 dark:text-amber-400 mr-2" />
              <span className="text-amber-600 dark:text-amber-400 font-semibold text-sm">L'horlogerie suisse accessible à tous</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-slate-900 dark:text-white">Passion & Découverte</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 dark:from-amber-400 dark:via-amber-300 dark:to-amber-500">
                Horlogère Suisse
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 leading-relaxed text-slate-600 dark:text-gray-300">
              Explorez librement ressources, tutoriels et savoirs horlogers partagés par des <span className="text-amber-600 dark:text-amber-400 font-semibold">passionnés</span> pour des <span className="text-amber-600 dark:text-amber-400 font-semibold">passionnés</span>
            </p>

            {/* Actions d'Atelier Haute Horlogerie */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/theorie" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 flex items-center justify-center gap-3 text-base"
                >
                  <BookOpen className="w-5 h-5 text-slate-950" />
                  <span>Entrer dans l'Atelier</span>
                  <ArrowRight className="w-5 h-5 text-slate-950" />
                </motion.button>
              </Link>

              <Link href="/outils" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full px-8 py-4 bg-white dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-300 dark:border-slate-700 hover:border-amber-500 text-slate-800 dark:text-slate-200 font-semibold rounded-xl backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2.5 text-base group"
                >
                  <Sparkles className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Outils & Diagnostic IA</span>
                </motion.button>
              </Link>
            </div>

            {/* Badges de légitimité & standards horlogers */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                <span className="font-medium text-slate-800 dark:text-slate-200">Standards NIHS & COSC</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm backdrop-blur-sm">
                <span className="text-amber-500 dark:text-amber-400">⚙️</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">Calibres & Habillage</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm backdrop-blur-sm">
                <span className="text-amber-500 dark:text-amber-400">🇨🇭</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">Savoir-Faire Genevois</span>
              </div>
            </div>
          </motion.div>

                    {/* Horloge interactive Haute Horlogerie Suisse */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <LuxuryHeroClock />
          </div>
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
      <FadeInSection id="theorie" className="py-32 text-center bg-white dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-8">
            <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <span className="text-sm text-amber-600 dark:text-amber-300">Bienvenue dans l'univers horloger</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-amber-400 dark:via-amber-300 dark:to-amber-500">
            Le Temps à l'État Pur
          </h2>

          <p className="text-xl leading-relaxed text-slate-600 dark:text-gray-300">
            Plongez dans l'univers fascinant de l'horlogerie. Explorez l'histoire,
            maîtrisez les techniques, et découvrez les secrets de ces merveilles
            mécaniques qui battent au rythme du temps.
          </p>
        </div>
      </FadeInSection>

      {/* Sections chargées dynamiquement */}
      <RessourcesPharesSection resources={featuredResources} />
      <ThematiquesSection thematiques={thematiques} />
      <ActualitesSection actualites={actualites} />

      {/* --- LE CERCLE DES PASSIONNÉS HORLOGERS --- */}
      <FadeInSection id="contribuer" className="py-24 px-4 relative overflow-hidden bg-slate-50/60 dark:bg-[#07090E]/80 transition-colors duration-300 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/5 blur-[160px] pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl p-8 sm:p-14 border border-amber-500/30 dark:border-amber-500/30 bg-white dark:bg-gradient-to-br dark:from-amber-500/10 dark:via-slate-900/90 dark:to-slate-950 shadow-xl dark:shadow-[0_0_50px_rgba(212,175,55,0.12)] text-center overflow-hidden"
          >
            {/* Liseré supérieur or brossé */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

            <div className="relative z-10 space-y-6">
              {/* Badge d'authenticité */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-300 text-xs font-mono font-bold uppercase tracking-widest">
                <span>✦ PROJET INDÉPENDANT & PASSIONNÉ · SUISSE ✦</span>
              </div>

              {/* Titre Serif de prestige */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
                Rejoindre le{' '}
                <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                  Cercle des Passionnés
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                Suivez l&apos;évolution de HorloLearn et soyez prévenu des nouveaux cours, quiz interactifs et guides partagés sur le site. Un espace d&apos;apprentissage libre et gratuit, créé par un passionné pour tous les amoureux d&apos;horlogerie.
              </p>

              {/* Les 3 piliers d'authenticité */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto py-2 text-left sm:text-center text-xs font-mono text-slate-600 dark:text-slate-400">
                <div className="flex items-center sm:justify-center gap-1.5">
                  <span className="text-amber-500 font-bold">✓</span>
                  <span>100% Libre & Gratuit</span>
                </div>
                <div className="flex items-center sm:justify-center gap-1.5">
                  <span className="text-amber-500 font-bold">✓</span>
                  <span>Animé par la passion</span>
                </div>
                <div className="flex items-center sm:justify-center gap-1.5">
                  <span className="text-amber-500 font-bold">✓</span>
                  <span>Zéro spam, juste les nouveautés</span>
                </div>
              </div>

              {/* Formulaire simple et direct */}
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto pt-2">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  required
                  className="flex-1 rounded-xl px-5 py-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 backdrop-blur-sm bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-amber-500/30 transition-all font-mono"
                />
                <button
                  type="submit"
                  className="px-7 py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 text-sm whitespace-nowrap font-mono flex items-center justify-center gap-2 group"
                >
                  <span>Rejoindre</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Mentions de respect */}
              <div className="flex items-center justify-center gap-6 pt-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-amber-500" />
                  Flux RSS disponible
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Désinscription libre en 1 clic
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Styles globaux */}
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body { margin: 0; padding: 0; }
      `}</style>
    </div>
  )
}
