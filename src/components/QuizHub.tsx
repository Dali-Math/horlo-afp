import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Award, Star, ArrowRight, Play, BookOpen, Clock, Target } from 'lucide-react';
import { QuizFinal } from '../data/quizData';

interface QuizHubProps {
  quizzes: QuizFinal[];
  completedQuizzes: string[];
  onStartInteractiveQuiz: (quiz: QuizFinal) => void;
  onStartPersonalizedQuiz: (quiz: QuizFinal) => void;
}

const QuizHub: React.FC<QuizHubProps> = ({ 
  quizzes, 
  completedQuizzes, 
  onStartInteractiveQuiz, 
  onStartPersonalizedQuiz 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Tous');

  // Séparer les quiz par type
  const interactiveQuizzes = quizzes.filter(q => q.isInteractive);
  const personalizedQuizzes = quizzes.filter(q => q.isPersonalized);

  // Filtrer les quiz
  const filteredQuizzes = quizzes.filter(quiz => {
    const categoryMatch = selectedCategory === 'Tous' || quiz.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'Tous' || quiz.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const categories = ['Tous', ...Array.from(new Set(quizzes.map(q => q.category)))];
  const difficulties = ['Tous', ...Array.from(new Set(quizzes.map(q => q.difficulty)))];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'crown': return <Crown className="w-6 h-6" />;
      case 'award': return <Award className="w-6 h-6" />;
      case 'star': return <Star className="w-6 h-6" />;
      case 'ruler': return <Target className="w-6 h-6" />;
      case 'cpu': return <BookOpen className="w-6 h-6" />;
      case 'settings': return <Clock className="w-6 h-6" />;
      case 'cog': return <Clock className="w-6 h-6" />;
      case 'map-pin': return <Target className="w-6 h-6" />;
      case 'zap': return <Star className="w-6 h-6" />;
      default: return <Award className="w-6 h-6" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant': return 'from-green-500 to-emerald-500';
      case 'Intermédiaire': return 'from-yellow-500 to-orange-500';
      case 'Expert': return 'from-red-500 to-pink-500';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  const isCompleted = (quizId: string) => completedQuizzes.includes(quizId);

  const startQuiz = (quiz: QuizFinal) => {
    if (quiz.isInteractive) {
      onStartInteractiveQuiz(quiz);
    } else if (quiz.isPersonalized) {
      onStartPersonalizedQuiz(quiz);
    }
  };

  return (
    <section id="quiz" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-6">
            Quiz Horlogerie - Collection Complète
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            50 quiz interactifs + 3 quiz personnalisés pour une maîtrise totale de l'horlogerie suisse
          </p>
        </motion.div>

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
            <Play className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">{interactiveQuizzes.length}</div>
            <div className="text-white/70 text-sm">Quiz Interactifs</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
            <Target className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">{personalizedQuizzes.length}</div>
            <div className="text-white/70 text-sm">Quiz Personnalisés</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
            <Award className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">{completedQuizzes.length}</div>
            <div className="text-white/70 text-sm">Quiz Complétés</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              {Math.round((completedQuizzes.length / quizzes.length) * 100)}%
            </div>
            <div className="text-white/70 text-sm">Progression</div>
          </div>
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3">
            <span className="text-white/80 text-sm">Filtrer par</span>
          </div>
          
          {/* Catégories */}
          <div className="flex flex-wrap gap-2">
            <span className="text-white/80 text-sm self-center">Catégorie:</span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-amber-500 text-white'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Difficultés */}
          <div className="flex flex-wrap gap-2">
            <span className="text-white/80 text-sm self-center">Difficulté:</span>
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedDifficulty === difficulty
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid des Quiz */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredQuizzes.map((quiz, index) => {
              const completed = isCompleted(quiz.id);
              
              return (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl h-full relative">
                    {/* Badge Complet */}
                    {completed && (
                      <div className="absolute top-4 left-4 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                        <Award className="w-3 h-3" />
                        <span>Terminé</span>
                      </div>
                    )}

                    {/* Header with Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={quiz.image}
                        alt={quiz.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      {/* Type Badge */}
                      <div className="absolute top-4 right-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          quiz.isInteractive 
                            ? 'bg-blue-500/80 text-white' 
                            : 'bg-purple-500/80 text-white'
                        }`}>
                          {quiz.isInteractive ? 'Interactif' : 'Personnalisé'}
                        </div>
                      </div>

                      {/* Difficulty Badge */}
                      <div className="absolute bottom-4 left-4">
                        <div className={`bg-gradient-to-r ${getDifficultyColor(quiz.difficulty)} px-3 py-1 rounded-full`}>
                          <span className="text-white text-xs font-semibold">{quiz.difficulty}</span>
                        </div>
                      </div>

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-lg rounded-full p-6">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center mb-4">
                        <div className={`bg-gradient-to-r ${quiz.gradient} p-3 rounded-xl mr-4`}>
                          {getIcon(quiz.icon)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-1">{quiz.title}</h3>
                          <p className="text-amber-400 text-sm font-medium">{quiz.subtitle}</p>
                        </div>
                      </div>

                      <p className="text-white/70 text-sm mb-6 leading-relaxed flex-1">
                        {quiz.description}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="flex items-center text-white/80">
                          <Clock className="w-4 h-4 mr-1 text-amber-400" />
                          <span className="text-xs">{quiz.duration} min</span>
                        </div>
                        <div className="flex items-center text-white/80">
                          <BookOpen className="w-4 h-4 mr-1 text-amber-400" />
                          <span className="text-xs">{quiz.questionsCount} questions</span>
                        </div>
                        <div className="flex items-center text-white/80">
                          <Target className="w-4 h-4 mr-1 text-amber-400" />
                          <span className="text-xs">{quiz.category}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => startQuiz(quiz)}
                        className={`bg-gradient-to-r ${quiz.gradient} hover:shadow-lg text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2`}
                      >
                        <Play className="w-5 h-5" />
                        <span>{completed ? 'Refaire' : 'Commencer'}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default QuizHub;
