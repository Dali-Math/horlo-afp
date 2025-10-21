'use client'

import React, { useState, useEffect } from 'react'
import { Clock, Menu, X, Heart, Users, PlayCircle, FileText, ChevronRight, ArrowRight } from 'lucide-react'

export default function HorloLearnHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const navigationLinks = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Ressources', href: '#ressources' },
    { label: 'Communauté', href: '#communaute' },
    { label: 'Actualités', href: '#actualites' },
    { label: 'Contribuer', href: '#contribuer' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-xl z-50 border-b border-amber-500/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <svg viewBox="0 0 40 40" className="w-full h-full text-amber-400 animate-spin" style={{ animationDuration: '8s' }}>
                  <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                  <line x1="20" y1="6" x2="20" y2="14" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="20" y1="26" x2="20" y2="34" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-amber-400">HorloLearn</h1>
                <p className="text-xs text-amber-300">{time.toLocaleTimeString('fr-FR')}</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-8">
              {navigationLinks.map(link => (
                <a key={link.label} href={link.href} className="text-sm text-gray-300 hover:text-amber-400 transition-colors duration-300">
                  {link.label}
                </a>
              ))}
              <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full font-semibold">
                Contribuer
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-amber-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 border-t border-amber-500/20 px-4 py-4 space-y-3">
            {navigationLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="block text-sm text-gray-300 hover:text-amber-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg font-semibold mt-4">
              Contribuer
            </button>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <section id="accueil" className="relative flex items-center justify-center pt-32 pb-20 px-4 min-h-[80vh]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-6 px-5 py-2 bg-slate-800/80 rounded-full text-amber-400 text-sm font-medium">
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Bienvenue dans l'univers horloger
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-amber-400 mb-8">
            Le Temps à l'État Pur
          </h1>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed mb-6">
            Plongez dans l'univers fascinant de l'horlogerie. Explorez l'histoire, maîtrisez les techniques, et découvrez les secrets de ces merveilles mécaniques qui battent au rythme du temps.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <a href="#ressources" className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full font-semibold flex items-center hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300">
              Explorer maintenant
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#communaute" className="px-8 py-4 border border-amber-400/50 rounded-full font-semibold hover:bg-amber-500/10 transition-colors duration-300 flex items-center">
              Rejoindre la communauté
            </a>
          </div>
        </div>
      </section>

      {/* Section Ressources (exemples, sans chiffres) */}
      <section id="ressources" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ressources à découvrir
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            PDF techniques, guides pratiques, vidéos tutoriels — tout pour l’horlogerie suisse.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/60 rounded-xl p-6 flex flex-col items-center">
              <FileText className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-lg font-bold mb-2 text-white">Guide complet ETA 2824-2</h3>
              <p className="text-sm text-gray-400 mb-3">Démontage, éclaté annoté, couples de serrage. Haute résolution, partagé par la communauté.</p>
              <button className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg text-sm font-semibold hover:shadow">
                Télécharger
              </button>
            </div>
            <div className="bg-slate-800/60 rounded-xl p-6 flex flex-col items-center">
              <PlayCircle className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-lg font-bold mb-2 text-white">Tutoriel Vidéo : Réglage spiral ETA 6497</h3>
              <p className="text-sm text-gray-400 mb-3">Technique professionnelle, exemples détaillés et conseils d’experts vidéos HD.</p>
              <button className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg text-sm font-semibold hover:shadow">
                Regarder
              </button>
            </div>
            <div className="bg-slate-800/60 rounded-xl p-6 flex flex-col items-center">
              <Users className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-lg font-bold mb-2 text-white">Forum de la communauté</h3>
              <p className="text-sm text-gray-400 mb-3">Partagez vos questions, astuces et expériences directement avec d’autres passionnés.</p>
              <button className="px-6 py-2 border border-amber-400/50 rounded-lg text-sm font-semibold hover:bg-amber-500/10 transition-colors">
                Accéder au forum
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section communauté simple */}
      <section id="communaute" className="py-20 px-4 bg-slate-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">La Communauté HorloLearn</h2>
          <p className="text-gray-400 mb-8">Un espace ouvert à tous : partage, entraide et passion autour de l’horlogerie suisse. 
            Rejoignez-nous, proposez vos ressources et faites grandir le projet !</p>
          <a href="#contribuer" className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full font-semibold hover:shadow-lg transition-all">
            Contribuer maintenant
          </a>
        </div>
      </section>

      {/* Footer minimaliste */}
      <footer className="border-t border-amber-500/10 bg-slate-950 py-10 px-4 text-center text-sm text-gray-400">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-lg">
            <Heart className="w-5 h-5" />
            HorloLearn
          </div>
          <div>
            Plateforme collaborative dédiée à la passion horlogère suisse.
          </div>
          <div>
            © 2025 HorloLearn. Tous droits réservés.
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
