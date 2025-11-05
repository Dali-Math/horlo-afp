'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/cartouche/Navigation'
import FieldsExplorer from '@/components/cartouche/FieldsExplorer'
import InteractiveCartouche from '@/components/cartouche/InteractiveCartouche'
import MemoSection from '@/components/cartouche/MemoSection'
import FAQSection from '@/components/cartouche/FAQSection'
import QuizSection from '@/components/cartouche/QuizSection'
import NormesSection from '@/components/cartouche/NormesSection'
import { GraduationCap, Award } from 'lucide-react'
import { SectionType } from '@/types'

export default function Page() {
  const [currentSection, setCurrentSection] = useState<SectionType>('cartouche')
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
    if (darkMode) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
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

  const sections: Record<string, JSX.Element> = {
    cartouche: <InteractiveCartouche darkMode={darkMode} />,
    champs: <FieldsExplorer darkMode={darkMode} />,

    // ✅ Remplacement : ici on intègre le nouveau cartouche à la place du tableau d’avant
    tableaux: (
      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-6">
        <div className="bg-slate-800 text-white rounded-2xl p-8 shadow-2xl w-full max-w-5xl">
          <div className="text-center mb-6 text-slate-300 text-sm">
            Position : Coin inférieur droit du plan (ISO 5457)
          </div>

          <div className="bg-slate-700 rounded-xl p-6">
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="p-3 rounded-lg bg-slate-600 text-sm font-medium flex justify-between">
                <span>Nom de l'entr...</span>
                <span className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">O</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-600 text-sm font-medium flex justify-between">
                <span>Titre</span>
                <span className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">O</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-600 text-sm font-medium flex justify-between">
                <span>Numéro de pièce</span>
                <span className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">O</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-3">
              <div className="p-3 rounded-lg bg-slate-600 text-sm font-medium flex justify-between">
                <span>Dessinateur</span>
                <span className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">O</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-600 text-sm font-medium flex justify-between">
                <span>Matériau</span>
                <span className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">O</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-600 text-sm font-medium flex justify-between">
                <span>Traitement de...</span>
                <span className="bg-blue-500 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">C</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-600 text-sm font-medium flex justify-between">
                <span>Masse</span>
                <span className="bg-blue-500 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">C</span>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3">
              {[
                'Échelle',
                'Vérificateur',
                'Tolérance gén...',
                "Méthode d'ap...",
                'Format',
                'Indice de...',
                'Date',
              ].map((label, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-slate-600 text-sm font-medium flex justify-between"
                >
                  <span>{label}</span>
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      ['Tolérance gén...', 'Méthode d\'ap...'].includes(label)
                        ? 'bg-blue-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {['Tolérance gén...', 'Méthode d\'ap...'].includes(label) ? 'C' : 'O'}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center gap-6 mt-6 text-slate-300 text-sm">
              <div className="flex items-center gap-2">
                <span className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">O</span>
                Obligatoire (O)
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">C</span>
                Conditionnel (C)
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    memo: <MemoSection darkMode={darkMode} />,
    faq: <FAQSection darkMode={darkMode} />,
    quiz: <QuizSection darkMode={darkMode} onQuizComplete={handleQuizComplete} />,
    normes: <NormesSection darkMode={darkMode} />,
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        userProgress={userProgress}
        darkMode={darkMode}
      />

      <main className="relative">
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
      </main>
    </div>
  )
}
