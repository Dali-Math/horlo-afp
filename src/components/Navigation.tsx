import React from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, Clock, Home } from 'lucide-react'
import { TOUS_LES_QUIZZES } from '../data/quizData'

interface NavigationProps {
  darkMode: boolean
  toggleDarkMode: () => void
  currentState: 'home' | 'quiz'
  onNavigateHome: () => void
}

const Navigation: React.FC<NavigationProps> = ({
  darkMode,
  toggleDarkMode,
  currentState,
  onNavigateHome,
}) => {
  const scrollToSection = (sectionId: string) => {
    if (currentState !== 'home') return

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      // ↓↓↓ Le changement principal est ici ↓↓↓
      className="fixed top-0 left-0 right-0 z-30 bg-black/30 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={onNavigateHome}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-2 rounded-lg shadow-md">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">
              HorloLearn Quiz Final
            </h1>
          </button>

          {/* Navigation Links */}
          {currentState === 'home' && (
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-white/80 hover:text-amber-400 transition-colors font-medium"
              >
                Accueil
              </button>
              <button
                onClick={() => scrollToSection('timeline')}
                className="text-white/80 hover:text-amber-400 transition-colors font-medium"
              >
                Histoire
              </button>
              <button
                onClick={() => scrollToSection('marques')}
                className="text-white/80 hover:text-amber-400 transition-colors font-medium"
              >
                Marques
              </button>
              <button
                onClick={() => scrollToSection('quiz')}
                className="text-white/80 hover:text-amber-400 transition-colors font-medium"
              >
                Quiz ({TOUS_LES_QUIZZES.length})
              </button>
              <button
                onClick={() => scrollToSection('mecanismes')}
                className="text-white/80 hover:text-amber-400 transition-colors font-medium"
              >
                Techniques
              </button>
            </div>
          )}

          {/* Current State Indicator */}
          {currentState !== 'home' && (
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-white/10 backdrop-blur-lg rounded-full px-4 py-2">
                <span className="text-white/80 text-sm font-medium">Quiz</span>
              </div>
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>

            {currentState !== 'home' && (
              <button
                onClick={onNavigateHome}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-2 text-white transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Retour</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navigation
