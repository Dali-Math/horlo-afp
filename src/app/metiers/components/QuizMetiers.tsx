'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const questions = [
  {
    question: 'Quel outil est essentiel pour l’assemblage d’un mouvement horloger ?',
    options: ['Tournevis horloger', 'Marteau', 'Scie'],
    correct: 0,
  },
  {
    question: 'Combien de temps dure une formation AFP en horlogerie ?',
    options: ['1 an', '2 ans', '4 ans'],
    correct: 1,
  },
  {
    question: 'Quelle est l’unité de mesure de précision utilisée en horlogerie ?',
    options: ['Millimètre', 'Micron', 'Centimètre'],
    correct: 1,
  },
  {
    question: 'Quel produit est utilisé pour nettoyer les composants horlogers ?',
    options: ['Eau savonneuse', 'Alcool isopropylique', 'Acétone'],
    correct: 1,
  },
  {
    question: 'Quel contrôle est essentiel après l’assemblage d’une montre ?',
    options: ['Test d’étanchéité', 'Test de couleur', 'Test de poids'],
    correct: 0,
  },
];

export default function QuizMetiers() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
      setFeedback('✅ Bonne réponse !');
    } else {
      setFeedback('❌ Essaie encore');
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setFeedback(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setFeedback(null);
  };

  return (
    <section className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-[#E2B44F] text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Quiz de formation AFP
        </motion.h2>

        <motion.p
          className="text-lg text-[#d1d1d1] text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Teste tes connaissances sur les métiers de l'horlogerie.
        </motion.p>

        {!showResult ? (
          <motion.div
            className="bg-[#1A1A1A] p-8 rounded-lg border border-[#E2B44F]/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            key={currentQuestion}
          >
            <div className="mb-6">
              <span className="text-[#E2B44F] text-sm font-semibold">
                Question {currentQuestion + 1} / {questions.length}
              </span>
            </div>

            <h3 className="text-2xl text-[#E2B44F] font-semibold mb-6">
              {questions[currentQuestion].question}
            </h3>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                    selectedAnswer === index
                      ? index === questions[currentQuestion].correct
                        ? 'border-green-500 bg-green-500/20'
                        : 'border-red-500 bg-red-500/20'
                      : 'border-[#E2B44F]/20 hover:border-[#E2B44F] hover:bg-[#E2B44F]/10'
                  } disabled:cursor-not-allowed`}
                >
                  <span className="text-[#d1d1d1] font-medium">{option}</span>
                </button>
              ))}
            </div>

            {feedback && (
              <motion.div
                className="mt-6 text-center text-lg font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {feedback}
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            className="bg-[#1A1A1A] p-8 rounded-lg border border-[#E2B44F] text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="text-3xl text-[#E2B44F] font-bold mb-4">
              Quiz terminé !
            </h3>
            <p className="text-2xl text-[#d1d1d1] mb-6">
              Ton score : {score} / {questions.length}
            </p>
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-[#E2B44F] text-[#0a0a0a] font-semibold rounded-lg hover:bg-[#d4a73e] transition-colors duration-300"
            >
              Recommencer
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
