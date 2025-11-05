'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/cartouche/Navigation'
import FieldsExplorer from '@/components/cartouche/FieldsExplorer'
import InteractiveCartouche from '@/components/cartouche/InteractiveCartouche'
import TablesSection from '@/components/cartouche/TablesSection'
import MemoSection from '@/components/cartouche/MemoSection'
import FAQSection from '@/components/cartouche/FAQSection'
import QuizSection from '@/components/cartouche/QuizSection'
import NormesSection from '@/components/cartouche/NormesSection'
import { GraduationCap, Award } from 'lucide-react'
import { SectionType } from '@/types'

export default function Page() {
  const [currentSection, setCurrentSection] = useState<SectionType>('champs')
  const [darkMode, setDarkMode] = useState(false)
  const [userProgress, setUserProgress] = useState({
    completedQuizzes: 0,
    totalScore: 0,
    achievements: [] as string[],
  })

  useEffect(() => {
    const savedTheme = localStorage.getItem('cartouche-theme')
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark')
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('cartouche-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const handleQuizComplete = (score: number, completedQuestions: number) => {
    const newScore = Math.max(userProgress.totalScore, score)
    const newCompleted = Math.max(userProgress.completedQuizzes, completedQuestions)
    const achievements = [...userProgress.achievements]

    if (score >= 80 && !achievements.includes('expert')) achievements.push('expert')
    if (score === 100 && !achievements.includes('parfait')) achievements.push('parfait')
    if (completedQuestions >= 15 && !achievements.includes('complet')) achievements.push('complet')

    setUserProgress({ completedQuizzes: newCompleted, totalScore: newScore, achievements })
  }

  const renderSection = () => {
    const sections: Record<string, JSX.Element> = {
      champs: <FieldsExplorer darkMode={darkMode} />,
      cartouche: <InteractiveCartouche darkMode={darkMode} />,
      quiz: <QuizSection darkMode={darkMode} onQuizComplete={handleQuizComplete} />,
      tableaux: <TablesSection darkMode={darkMode} />,
      memo: <MemoSection darkMode={darkMode} />,
      faq: <FAQSection darkMode={darkMode} />,
      normes: <NormesSection darkMode={darkMode} />,
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {sections[currentSection]}
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        userProgress={userProgress}
        darkMode={darkMode}
      />

      <main className="relative">{renderSection()}</main>

      {/* Bouton mode sombre */}
      <motion.button
        onClick={toggleDarkMode}
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-lg transition-all duration-300 ${
          darkMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-800 hover:bg-gray-900'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="flex items-center justify-center">
          {darkMode ? <span className="text-white text-xl">☀️</span> : <span className="text-white text-xl">🌙</span>}
        </div>
      </motion.button>

      {/* Badge progression */}
      {(currentSection === 'champs' || currentSection === 'cartouche') && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className={`fixed bottom-6 left-6 p-4 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}
        >
          <div className="flex items-center space-x-3">
            <GraduationCap className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
            <div>
              <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Formation Cartouches Horlogers
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                7 sections • 15 questions • Normes ISO
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Succès */}
      <AnimatePresence>
        {userProgress.achievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed top-1/2 right-6 transform -translate-y-1/2 space-y-3"
          >
            {userProgress.achievements.map((ach, i) => (
              <motion.div
                key={ach}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.2, type: 'spring' }}
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  ach === 'parfait'
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                    : ach === 'expert'
                    ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                    : 'bg-gradient-to-r from-green-400 to-green-600'
                } shadow-lg`}
              >
                <Award className="w-6 h-6 text-white" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
