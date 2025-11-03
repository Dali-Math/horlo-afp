import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import QuizConversions from './quizzes/QuizConversions';
import MemoryGame6497 from './quizzes/MemoryGame6497';
import AtelierHorloger from './quizzes/AtelierHorloger';
import QuizStandard from './quizzes/QuizStandard';
import { QuizFinal } from '../data/quizData';

interface QuizInterfaceProps {
  quiz: QuizFinal | null;
  onExit: () => void;
  onComplete: (score: number, total: number) => void;
}

const QuizInterface: React.FC<QuizInterfaceProps> = ({ quiz, onExit, onComplete }) => {
  if (!quiz) return null;

  const handleQuizComplete = (score: number, total: number) => {
    onComplete(score, total);
  };

  const renderQuiz = () => {
    switch (quiz.component) {
      case 'QuizConversions':
        return <QuizConversions />;
      case 'MemoryGame6497':
        return <MemoryGame6497 />;
      case 'AtelierHorloger':
        return <AtelierHorloger />;
      default:
        // Quiz standard (interactif)
        return <QuizStandard quiz={quiz} onComplete={handleQuizComplete} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 pb-8"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <button
            onClick={onExit}
            className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 rounded-xl px-6 py-3 text-white transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour au contenu</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
              {quiz.title}
            </h1>
            <p className="text-white/70">{quiz.subtitle}</p>
          </div>

          <div className="w-32" /> {/* Spacer for centering */}
        </motion.div>

        {/* Quiz Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
        >
          {renderQuiz()}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default QuizInterface;