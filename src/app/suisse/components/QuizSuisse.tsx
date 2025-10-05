"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Quelle ville est considérée comme le berceau de l'horlogerie suisse?",
    options: ["Genève", "La Chaux-de-Fonds", "Bienne"],
    correct: 0
  },
  {
    id: 2,
    question: "Quel mécanisme est caractéristique des montres mécaniques suisses?",
    options: ["Quartz", "Échappement à ancre suisse", "Moteur électrique"],
    correct: 1
  },
  {
    id: 3,
    question: "Combien de rubis contient généralement un mouvement horloger de qualité?",
    options: ["7 rubis", "17 rubis", "25 rubis"],
    correct: 1
  },
  {
    id: 4,
    question: "Quelle est la fréquence standard d'un balancier-spiral suisse?",
    options: ["18 000 alternances/heure", "28 800 alternances/heure", "36 000 alternances/heure"],
    correct: 1
  },
  {
    id: 5,
    question: "Quel label garantit l'origine et la qualité suisse d'une montre?",
    options: ["Swiss Made", "Geneva Seal", "COSC"],
    correct: 0
  }
];

export default function QuizSuisse() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowFeedback(false);
    setQuizCompleted(false);
    setQuizStarted(false);
  };

  const getScoreMessage = (score: number) => {
    if (score === 5) return "Parfait ! Vous maîtrisez l'horlogerie suisse ! 🏆";
    if (score >= 4) return "Excellent ! Très bonne connaissance ! 👏";
    if (score >= 3) return "Bien ! Vous avez de bonnes bases ! 👍";
    if (score >= 2) return "Pas mal ! Continuez à apprendre ! 📚";
    return "Courage ! L'horlogerie n'a plus de secrets ! 💪";
  };

  return (
    <section className="py-20 px-6 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[#E2B44F] mb-12 text-center">
          Quiz Horloger
        </h2>

        {!quizStarted ? (
          <motion.div 
            className="bg-[#1A1A1A] p-8 rounded-lg border border-[#E2B44F]/20"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-400 text-center mb-6 text-lg">
              Testez vos connaissances sur l'horlogerie suisse
            </p>
            <p className="text-[#E2B44F] text-center mb-8 text-sm">
              5 questions • Niveau AFP • 3 choix par question
            </p>
            <motion.button 
              onClick={startQuiz}
              className="mx-auto block px-8 py-4 bg-[#E2B44F] text-black rounded-lg hover:bg-[#FFD700] transition-all duration-300 font-semibold text-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🕐 Démarrer le Quiz
            </motion.button>
          </motion.div>
        ) : quizCompleted ? (
          <motion.div 
            className="bg-[#1A1A1A] p-8 rounded-lg border border-[#E2B44F]/20 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h3 
              className="text-3xl font-bold text-[#E2B44F] mb-6"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Quiz Terminé !
            </motion.h3>
            
            <motion.div 
              className="mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <div className="text-6xl font-bold text-[#E2B44F] mb-2">
                {score}/5
              </div>
              <p className="text-gray-400 text-lg mb-4">
                {getScoreMessage(score)}
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                onClick={resetQuiz}
                className="px-6 py-3 bg-[#E2B44F] text-black rounded-lg hover:bg-[#FFD700] transition-all duration-300 font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔄 Recommencer
              </motion.button>
              <motion.button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ↑ Haut de page
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="bg-[#1A1A1A] p-8 rounded-lg border border-[#E2B44F]/20"
            key={currentQuestion}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#E2B44F] font-semibold">
                  Question {currentQuestion + 1} sur {questions.length}
                </span>
                <span className="text-gray-400">
                  Score: {score}/{questions.length}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div 
                  className="bg-[#E2B44F] h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Question */}
            <motion.h3 
              className="text-xl md:text-2xl font-semibold text-white mb-8 leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {questions[currentQuestion].question}
            </motion.h3>

            {/* Answers */}
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => {
                let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-300 font-medium ";
                
                if (selectedAnswer === null) {
                  buttonClass += "border-gray-600 bg-gray-800 hover:border-[#E2B44F] hover:bg-gray-700 text-white";
                } else if (index === questions[currentQuestion].correct) {
                  buttonClass += "border-green-500 bg-green-500/20 text-green-400";
                } else if (index === selectedAnswer) {
                  buttonClass += "border-red-500 bg-red-500/20 text-red-400";
                } else {
                  buttonClass += "border-gray-600 bg-gray-800/50 text-gray-500";
                }

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={buttonClass}
                    disabled={selectedAnswer !== null}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                    whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                  >
                    <span className="font-bold text-[#E2B44F] mr-3">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                    {selectedAnswer !== null && index === questions[currentQuestion].correct && (
                      <span className="float-right text-green-400 font-bold">✅</span>
                    )}
                    {selectedAnswer !== null && index === selectedAnswer && index !== questions[currentQuestion].correct && (
                      <span className="float-right text-red-400 font-bold">❌</span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <motion.div 
                className="mt-8 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {selectedAnswer === questions[currentQuestion].correct ? (
                  <p className="text-green-400 font-semibold text-lg">
                    ✅ Bonne réponse !
                  </p>
                ) : (
                  <p className="text-red-400 font-semibold text-lg">
                    ❌ Essaie encore ! La bonne réponse était : {questions[currentQuestion].options[questions[currentQuestion].correct]}
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
