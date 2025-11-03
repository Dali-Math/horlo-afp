import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Award, Zap, Users, Play } from 'lucide-react';

interface HeroProps {
  getQuizCount: () => number;
  getCompletedCount: () => number;
}

const Hero: React.FC<HeroProps> = ({ getQuizCount, getCompletedCount }) => {
  const scrollToQuiz = () => {
    const element = document.getElementById('quiz');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTimeline = () => {
    const element = document.getElementById('timeline');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/Patek_Philippe_Nautilus_Steel_Blue_Dial_Luxury_Watch.jpg"
          alt="Montre de luxe"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-blue-900/40 to-black/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-4 rounded-2xl mr-4">
              <Clock className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500 bg-clip-text text-transparent">
              HorloLearn
            </h1>
          </div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-2xl md:text-3xl text-white/90 mb-6 font-light"
          >
            Quiz & Culture Horlogère Suisse - Version Finale
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Découvrez l'art ancestral de l'horlogerie suisse à travers une expérience interactive unique. 
            Timeline interactive, galeries de marques prestigieuses, 50 quiz interactifs et 3 quiz personnalisés pour maîtriser tous les secrets de la précision.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
        >
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <Clock className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-white/70 text-sm">Années d'Histoire</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <Award className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{getQuizCount()}</div>
              <div className="text-white/70 text-sm">Quiz Totaux</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <Zap className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">15+</div>
              <div className="text-white/70 text-sm">Marques Légendes</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <Users className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{getCompletedCount()}</div>
              <div className="text-white/70 text-sm">Quiz Complétés</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6"
        >
          <button
            onClick={scrollToQuiz}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <Play className="w-5 h-5" />
            <span>Commencer les Quiz</span>
          </button>
          <button
            onClick={scrollToTimeline}
            className="bg-white/10 backdrop-blur-lg border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/20 transform hover:scale-105"
          >
            Découvrir l'Histoire
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-amber-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
