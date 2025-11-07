'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, CheckCircle, X, ArrowRight, Trophy } from 'lucide-react'
import { quizData } from './data'

export default function QuizSection() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  const total = quizData.length
  const question = quizData[current]

  const handleAnswer = (index: number) => {
    setSelected(index)
    const isCorrect = index === question.correctAnswer
    setFeedback(isCorrect ? 'correct' : 'wrong')
    if (isCorrect) setScore(prev => prev + 1)

    // Passe automatiquement à la question suivante après 1.2s
    setTimeout(() => {
      setFeedback(null)
      setSelected(null)
      if (current + 1 < total) {
        setCurrent(prev => prev + 1)
      } else {
        setCompleted(true)
      }
    }, 1200)
  }

  if (completed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-6">
        <Trophy className="w-16 h-16 text-yellow-400" />
        <h1 className="text-4xl font-bold text-white">Quiz terminé 🎉</h1>
        <p className="text-lg text-gray-300">
          Score : {score} / {total}
        </p>
        <button
          onClick={() => {
            setCurrent(0)
            setScore(0)
            setCompleted(false)
          }}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
        >
          Recommencer
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-blue-400">
            Question {current + 1} / {total}
          </h2>
          <div className="text-white text-lg font-bold">
            Score : {score}
          </div>
        </div>

        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="p-6 rounded-2xl bg-gray-900 border border-gray-700 shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-5">
            <Brain className="text-blue-400 w-6 h-6" />
            <h3 className="text-2xl font-bold text-white">{question.question}</h3>
          </div>

          <div className="space-y-3">
            {question.options.map((opt, i) => {
              const isSelected = selected === i
              const correct = feedback === 'correct' && i === question.correctAnswer
              const wrong = feedback === 'wrong' && isSelected

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={feedback !== null}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    correct
                      ? 'bg-green-600/30 border-green-500 text-green-200'
                      : wrong
                      ? 'bg-red-600/30 border-red-500 text-red-200'
                      : isSelected
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                      : 'border-gray-600 text-gray-200 hover:bg-gray-800'
                  }`}
                >
                  {opt}
                </button>
              )
            })}
          </div>

          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 flex items-center space-x-2 text-lg"
              >
                {feedback === 'correct' ? (
                  <>
                    <CheckCircle className="text-green-400 w-5 h-5" />
                    <span className="text-green-300 font-semibold">
                      Bonne réponse !
                    </span>
                  </>
                ) : (
                  <>
                    <X className="text-red-400 w-5 h-5" />
                    <span className="text-red-300 font-semibold">
                      Mauvaise réponse.
                    </span>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
