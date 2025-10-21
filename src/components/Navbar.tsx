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
  Users, 
  Download,
  Sparkles,
  ArrowRight,
  Radio,
  Globe
} from 'lucide-react'

// --- Animation section ---
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

// --- Page principale ---
export default function HorloLearnHome() {
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

  const actualites = [
    {
      title: 'Watches & Wonders 2026 : Dates confirmées',
      time: 'Il y a 2 jours',
      category: 'Événement',
    },
    {
      title: 'Nouveau calibre Sellita SW330-2 annoncé',
      time: 'Il y a 5 jours',
      category: 'Innovation',
    },
    {
      title: 'Formation AFP : Nouveaux programmes 2026',
      time: 'Il y a 1 semaine',
      category: 'Formation',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">

      {/* --- Arrière-plan animé --- */}
      <div className="fixed inset-0 opacity-5 pointer-events-none overflow-hidden">
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

      {/* --- HERO --- */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full backdrop-blur-sm">
              <Radio className="w-4 h-4 text-green-400 animate-pulse" />
              <span className="text-sm text-green-300">{onlineUsers} passionnés en ligne</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              L'horlogerie suisse{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                n'a jamais été aussi accessible
              </span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
              Explorez <span className="text-amber-400 font-bold">2,500+ ressources</span> partagées par des passionnés.
              Documents techniques, vidéos, guides pratiques — 100% gratuit.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-amber-500/50 transition-all flex items-center justify-center">
                <Sparkles className="mr-2 w-5 h-5" /> Explorer maintenant <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="px-8 py-4 border-2 border-amber-400/50 rounded-full font-semibold hover:bg-amber-500/10 transition-all flex items-center justify-center">
                <Users className="mr-2 w-5 h-5" /> Rejoindre la communauté
              </button>
            </div>
          </motion.div>

          {/* --- HORLOGE --- */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}>
            <div className="relative w-96 h-96 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-8 border-amber-500/20 flex items-center justify-center">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={`absolute ${i % 3 === 0 ? 'w-2 h-8 bg-amber-400' : 'w-1 h-4 bg-amber-500/50'}`} style={{ transform: `rotate(${i * 30}deg) translateY(-170px)` }} />
                ))}
                <motion.div className="absolute w-3 h-28 bg-gradient-to-t from-amber-400 to-amber-500 rounded-full origin-bottom" style={{ rotate: hoursDegrees }} />
                <motion.div className="absolute w-2 h-36 bg-gradient-to-t from-amber-300 to-amber-400 rounded-full origin-bottom" style={{ rotate: minutesDegrees }} />
                <motion.div className="absolute w-1 h-40 bg-gradient-to-t from-red-500 to-red-400 rounded-full origin-bottom" style={{ rotate: secondsDegrees }} />
                <div className="absolute w-6 h-6 bg-amber-400 rounded-full border-2 border-white" />
              </div>
              <div className="absolute bottom-10 w-full text-center text-amber-400 font-mono text-lg">{time.toLocaleTimeString('fr-FR')}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- RESSOURCES --- */}
      <FadeInSection id="ressources" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center text-amber-400">Ressources Populaires</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredResources.map((r, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="bg-slate-900/60 border border-amber-500/20 p-8 rounded-2xl transition-all hover:border-amber-400/50">
                <div className="flex justify-between mb-4 text-sm">
                  <span className="text-amber-400">{r.badge}</span>
                  <span className="text-blue-400">{r.type}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{r.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{r.description}</p>
                <p className="text-xs text-gray-500">Par {r.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* --- THÉMATIQUES --- */}
      <FadeInSection className="py-20 bg-slate-900/30 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Explorer par <span className="text-amber-400">Thématique</span></h2>
          <div className="grid md:grid-cols-3 gap-8">
            {thematiques.map((t, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }} className="p-8 rounded-2xl bg-slate-800/60 border border-amber-500/20">
                <div className="text-5xl mb-4">{t.icon}</div>
                <h3 className="text-2xl font-bold text-amber-400 mb-2">{t.title}</h3>
                <p className="text-gray-400 mb-4">{t.description}</p>
                <ul className="text-sm text-gray-300 space-y-1">{t.items.map((it, j) => <li key={j} className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-amber-400" />{it}</li>)}</ul>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* --- ACTUALITÉS --- */}
      <FadeInSection id="actualites" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-amber-400">Actualités Horlogères</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {actualites.map((a, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} className="bg-slate-800/60 border border-amber-500/20 rounded-xl p-6">
                <span className="text-xs uppercase text-amber-400">{a.category}</span>
                <h3 className="text-lg font-bold mt-2 mb-1">{a.title}</h3>
                <p className="text-gray-500 text-sm">{a.time}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* --- NEWSLETTER --- */}
      <FadeInSection className="py-20 bg-slate-900/50 text-center">
        <h2 className="text-4xl font-bold text-amber-400 mb-4">Restez Informé</h2>
        <p className="text-gray-300 mb-8">Recevez chaque semaine de nouvelles ressources et actualités horlogères</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <input type="email" placeholder="Votre email" className="flex-1 bg-slate-800 border border-amber-500/30 rounded-lg px-6 py-4 text-white placeholder-gray-500" />
          <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg font-semibold text-white">S'abonner</button>
        </div>
      </FadeInSection>

      {/* --- FOOTER --- */}
      <footer className="border-t border-amber-500/10 bg-slate-950/50 py-8 text-center text-sm text-gray-500">
        © 2025 HorloLearn — Projet communautaire open-source 🇨🇭
      </footer>
    </div>
  )
}
