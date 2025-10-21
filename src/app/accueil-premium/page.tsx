'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Clock, 
  BookOpen, 
  Users, 
  Award, 
  Calendar, 
  ChevronRight, 
  Watch, 
  Menu, 
  X,
  WrenchScrewdriver,
  Landmark,
  Globe
} from 'lucide-react'

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  
  // Animations thématiques horlogerie
  const gearRotation = useTransform(scrollY, [0, 1000], [0, 360])
  const parallaxY = useTransform(scrollY, [0, 500], [0, -100])
  const subtleTick = useTransform(scrollY, [0, 200], [0, 5])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Calcul des positions des aiguilles de l'horloge
  const hours = currentTime.getHours() % 12
  const minutes = currentTime.getMinutes()
  const seconds = currentTime.getSeconds()
  const hourDegrees = (hours * 30) + (minutes * 0.5)
  const minuteDegrees = minutes * 6 + (seconds * 0.1)
  const secondDegrees = seconds * 6

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50">
      {/* Navigation Professionnelle */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Watch className="h-8 w-8 text-amber-600 animate-spin-slow" /> {/* Animation subtile de rotation */}
              <span className="text-2xl font-bold text-gray-900">HorloCulture</span>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#hero" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">Accueil</a>
              <a href="#formations" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">Formations</a>
              <a href="#histoire" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">Histoire</a>
              <a href="#collections" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">Collections</a>
              <a href="#contact" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">Contact</a>
            </div>

            {/* Bouton Mobile */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Menu Mobile */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="md:hidden bg-white border-t overflow-hidden"
            >
              <div className="px-2 py-2 space-y-1">
                {['Accueil', 'Formations', 'Histoire', 'Collections', 'Contact'].map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="block px-3 py-2 text-gray-700 hover:text-amber-600 rounded-md">
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Section Hero avec Horloge Animée */}
      <section id="hero" className="pt-24 pb-20 relative overflow-hidden">
        {/* Arrière-plan avec engrenages animés */}
        <motion.div style={{ y: parallaxY }} className="absolute inset-0 opacity-10">
          <motion.div style={{ rotate: gearRotation }} className="absolute top-10 right-10 w-48 h-48">
            <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400">
              <path d="M50 10 L55 20 L65 18 L67 28 L77 30 L75 40 L83 47 L75 54 L77 64 L67 66 L65 76 L55 74 L50 84 L45 74 L35 76 L33 66 L23 64 L25 54 L17 47 L25 40 L23 30 L33 28 L35 18 L45 20 Z" fill="currentColor" />
            </svg>
          </motion.div>
          <motion.div style={{ rotate: gearRotation }} className="absolute bottom-10 left-10 w-40 h-40 -scale-x-1">
            <svg viewBox="0 0 100 100" className="w-full h-full text-amber-300">
              <path d="M50 10 L55 20 L65 18 L67 28 L77 30 L75 40 L83 47 L75 54 L77 64 L67 66 L65 76 L55 74 L50 84 L45 74 L35 76 L33 66 L23 64 L25 54 L17 47 L25 40 L23 30 L33 28 L35 18 L45 20 Z" fill="currentColor" />
            </svg>
          </motion.div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
          >
            L'Art de l'Horlogerie
            <span className="block text-amber-600">Éducatif & Culturel</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            Plongez dans l'univers fascinant de la mesure du temps. Formations professionnelles, 
            histoire des garde-temps et collections emblématiques.
          </motion.p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center mx-auto"
            >
              Découvrir les Formations
              <ChevronRight className="ml-2 h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center mx-auto"
            >
              Explorer l'Histoire
            </motion.button>
          </div>

          {/* Horloge Animée Centrale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative mx-auto w-64 h-64"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 shadow-xl border-4 border-amber-500">
              {/* Marqueurs d'heures */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-4 bg-gray-700 rounded"
                  style={{
                    top: '12px',
                    left: '50%',
                    transform: `translateX(-50%) rotate(${i * 30}deg)`,
                    transformOrigin: 'center 144px'
                  }}
                />
              ))}
              
              {/* Aiguilles */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Heure */}
                <div 
                  className="w-1.5 h-20 bg-gray-800 rounded-full origin-bottom"
                  style={{ transform: `rotate(${hourDegrees}deg)` }}
                />
                {/* Minute */}
                <div 
                  className="w-1 h-28 bg-gray-700 rounded-full origin-bottom"
                  style={{ transform: `rotate(${minuteDegrees}deg)` }}
                />
                {/* Seconde */}
                <motion.div 
                  className="w-0.5 h-32 bg-red-500 rounded-full origin-bottom"
                  style={{ 
                    transform: `rotate(${secondDegrees}deg)`,
                    y: subtleTick
                  }}
                  animate={{ rotate: secondDegrees }}
                  transition={{ duration: 1, ease: "linear" }}
                />
                {/* Centre */}
                <div className="absolute w-4 h-4 bg-amber-500 rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Formations */}
      <section id="formations" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center text-gray-900 mb-12"
          >
            Nos Formations Professionnelles
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "Bases de l'Horlogerie", desc: "Apprenez les fondamentaux de la mécanique horlogère" },
              { icon: WrenchScrewdriver, title: "Réparation & Entretien", desc: "Techniques avancées pour restaurer les garde-temps" },
              { icon: Award, title: "Certification Experte", desc: "Diplômes reconnus par l'industrie horlogère" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <item.icon className="h-12 w-12 text-amber-600 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2 text-center">{item.title}</h3>
                <p className="text-gray-600 text-center">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Histoire & Collections */}
      <section id="histoire" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Histoire de l'Horlogerie</h2>
              <p className="text-lg text-gray-600 mb-8">Découvrez l'évolution des techniques horlogères depuis les premiers cadrans solaires jusqu'aux complications modernes.</p>
              <motion.button whileHover={{ x: 5 }} className="flex items-center text-amber-600">
                Lire plus <ChevronRight className="ml-2 h-5 w-5" />
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-center"
            >
              <Landmark className="h-24 w-24 text-amber-600 mx-auto mb-4" />
              <p className="text-gray-600">De Suisse à France, explorez les berceaux de l'horlogerie.</p>
            </motion.div>
          </div>

          <div id="collections" className="mt-16">
            <h3 className="text-3xl font-bold text-center mb-8">Collections Emblématiques</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {['Patek Philippe', 'Rolex', 'Audemars Piguet'].map((brand, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-amber-50 p-6 rounded-lg text-center"
                >
                  <Globe className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                  <h4 className="font-semibold">{brand}</h4>
                  <p className="text-sm text-gray-600">Histoire et innovations</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Événements & CTA */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Calendar className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-4xl font-bold mb-6">Événements & Ateliers</h2>
          <p className="text-xl mb-8">Participez à nos expositions et ateliers interactifs pour vivre l'horlogerie.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 bg-white text-amber-600 rounded-lg font-semibold hover:bg-gray-100"
          >
            Réserver un Événement
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <Watch className="h-6 w-6 text-amber-500 inline mr-2" />
            <span className="font-bold">HorloCulture</span>
            <p className="text-gray-400 mt-2">Plateforme éducative dédiée à l'art horloger.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Liens Utiles</h4>
            <ul className="space-y-1 text-gray-400">
              <li><a href="#" className="hover:text-amber-500">Formations</a></li>
              <li><a href="#" className="hover:text-amber-500">Blog</a></li>
              <li><a href="#" className="hover:text-amber-500">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Ressources</h4>
            <ul className="space-y-1 text-gray-400">
              <li><a href="#" className="hover:text-amber-500">Glossaire</a></li>
              <li><a href="#" className="hover:text-amber-500">Vidéos</a></li>
              <li><a href="#" className="hover:text-amber-500">Partenaires</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <p className="text-gray-400">contact@horloculture.fr</p>
            <p className="text-gray-400">+33 1 23 45 67 89</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-400">
          © 2024 HorloCulture. Tous droits réservés.
        </div>
      </footer>
    </div>
  )
}
