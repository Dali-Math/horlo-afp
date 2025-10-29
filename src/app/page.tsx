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
  Wand2, // ✅ ajouté ici
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
      title: 'Réglage spiral ETA 6497',
      description:
        'Tutoriel vidéo HD : technique professionnelle de réglage du spiral horloger.',
      author: 'Jean-Claude B.',
      downloads: '1,890',
      readTime: '22 min',
      badge: 'Populaire',
      href: '#',
    },
    {
      type: 'Guide',
      title: 'Révision complète Valjoux 7750',
      description:
        'Guide pas-à-pas avec photos et conseils d’expert pour démonter et remonter le mouvement.',
      author: 'Sophie L.',
      downloads: '1,560',
      readTime: '35 min',
      badge: 'Nouveau',
      href: '#',
    },
  ]

  return (
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

                  {/* ✅ Bouton corrigé */}
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
  )
}
