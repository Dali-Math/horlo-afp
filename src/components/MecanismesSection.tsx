import React from 'react';
import { motion } from 'framer-motion';
import { Cog, Timer, Zap, Crown } from 'lucide-react';

const MecanismesSection: React.FC = () => {
  const mecanismes = [
    {
      id: 'tourbillon',
      name: 'Tourbillon',
      description: 'Système de compensation gravitationnelle dans un cage rotative',
      complexity: 'Très Complexe',
      year: '1801',
      image: '/images/Vacheron_Constantin_Rose_Gold_Perpetual_Calendar_Tourbillon_Watch.jpg'
    },
    {
      id: 'chronographe',
      name: 'Chronographe',
      description: 'Mécanisme de mesure du temps écoulé avec boutons de contrôle',
      complexity: 'Complexe',
      year: '1816',
      image: '/images/IWC_Portugieser_Chronograph_Automatic_Blue_Dial_Luxury_Watch.jpg'
    },
    {
      id: 'quantieme-perpetuel',
      name: 'Quantième Perpétuel',
      description: 'Calendrier automatique avec correction automatique des mois',
      complexity: 'Très Complexe',
      year: '1925',
      image: '/images/IWC_Portugieser_Perpetual_Calendar_Blue_Dial_Luxury_Watch.jpg'
    }
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Très Complexe': return 'from-red-500 to-orange-500';
      case 'Complexe': return 'from-yellow-500 to-orange-500';
      case 'Intermédiaire': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <section id="mecanismes" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-6">
            Mécanismes & Techniques
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Plongez dans l'art complexité des complications horlogères et découvrez les secrets de la précision suisse
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mecanismes.map((mecanisme, index) => (
            <motion.div
              key={mecanisme.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={mecanisme.image}
                  alt={mecanisme.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                
                {/* Year */}
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {mecanisme.year}
                  </span>
                </div>

                {/* Complexity */}
                <div className="absolute top-4 right-4">
                  <div className={`bg-gradient-to-r ${getComplexityColor(mecanisme.complexity)} px-3 py-1 rounded-full`}>
                    <span className="text-white text-xs font-semibold">
                      {mecanisme.complexity.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Icon */}
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/20 backdrop-blur-lg rounded-lg p-3">
                    <Cog className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">{mecanisme.name}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  {mecanisme.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 text-sm font-medium">{mecanisme.complexity}</span>
                  <Zap className="w-5 h-5 text-amber-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MecanismesSection;
