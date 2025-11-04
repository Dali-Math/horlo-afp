'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Crown, Clock, Award, Zap, ChevronLeft } from 'lucide-react'

interface TimelineEvent {
  year: string
  title: string
  description: string
  significance: string
  icon: 'crown' | 'clock' | 'award' | 'zap'
  color: string
}

const Timeline: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)

  const timelineEvents: TimelineEvent[] = [
    {
      year: '1500',
      title: 'Premières Horloges Mécaniques',
      description: 'Peter Henlein crée les premières montres portables à Nuremberg',
      significance: "Révolution de l'horlogerie portable",
      icon: 'clock',
      color: 'from-blue-400 to-blue-600',
    },
    {
      year: '1675',
      title: 'Invention du Spiral',
      description: 'Christian Huygens améliore la précision avec le spiral',
      significance: "Précision révolutionnaire pour l'époque",
      icon: 'zap',
      color: 'from-green-400 to-green-600',
    },
    {
      year: '1776',
      title: 'Breguet & Les Complications',
      description: 'Abraham-Louis Breguet invente le tourbillon et le pare-chute',
      significance: 'Création des complications horlogères',
      icon: 'crown',
      color: 'from-purple-400 to-purple-600',
    },
    {
      year: '1842',
      title: 'Certification Chronometer',
      description: 'Premier chronomètre officiel Certification',
      significance: 'Standardisation de la précision horlogère',
      icon: 'award',
      color: 'from-amber-400 to-amber-600',
    },
    {
      year: '1969',
      title: 'Lunar Landing Watch',
      description: 'Omega Speedmaster devient la montre lunaire officielle',
      significance: 'Conquête spatiale et précision horlogère',
      icon: 'zap',
      color: 'from-indigo-400 to-indigo-600',
    },
    {
      year: '2024',
      title: 'Horlogerie Numérique',
      description: 'Intégration IA et connecté',
      significance: "Futur de l'horlogerie moderne",
      icon: 'zap',
      color: 'from-cyan-400 to-cyan-600',
    },
  ]

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'crown':
        return <Crown className="w-6 h-6" />
      case 'clock':
        return <Clock className="w-6 h-6" />
      case 'award':
        return <Award className="w-6 h-6" />
      case 'zap':
        return <Zap className="w-6 h-6" />
      default:
        return <Clock className="w-6 h-6" />
    }
  }

  return (
    <section id="timeline" className="py-20 relative">
      {/* --- Bouton fixe retour à Théorie --- */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/theorie"
          aria-label="Retour à la section Théorie"
          className="group inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white/80 px-4 py-2 text-sm font-medium text-gray-800 backdrop-blur-md shadow-md transition hover:bg-white hover:shadow-lg dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
        >
          <ChevronLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
          <span>Retour à <span className="font-semibold">Théorie</span></span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-6">
            Timeline Horlogerie
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Voyage à travers 5 siècles d'innovation et de précision suisse
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-400 via-blue-500 to-purple-600 rounded-full" />

          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <div
                    className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex flex-col items-start mb-4">
                      <div className={`bg-gradient-to-r ${event.color} p-3 rounded-lg mb-2`}>
                        {getIcon(event.icon)}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                      <div className="text-3xl font-bold text-amber-400">{event.year}</div>
                    </div>
                    <p className="text-white/80 mb-3">{event.description}</p>
                    <p className="text-amber-400 font-medium">{event.significance}</p>
                  </div>
                </div>

                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${event.color} rounded-full flex items-center justify-center border-4 border-white/20 shadow-lg`}
                  >
                    {getIcon(event.icon)}
                  </div>
                </div>
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-900/90 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center mb-6">
                <div className={`bg-gradient-to-r ${selectedEvent.color} p-4 rounded-xl mr-6`}>
                  {getIcon(selectedEvent.icon)}
                </div>
                <div>
                  <div className="text-4xl font-bold text-amber-400 mb-2">
                    {selectedEvent.year}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{selectedEvent.title}</h3>
                </div>
              </div>
              <p className="text-white/80 text-lg mb-4">{selectedEvent.description}</p>
              <p className="text-amber-400 font-semibold text-lg">{selectedEvent.significance}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Timeline
