'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon?: string;
}

const timelineData: TimelineEvent[] = [
  {
    year: '3500 av. J.-C.',
    title: 'Cadrans solaires',
    description: 'Les premières méthodes de mesure du temps utilisent l\'ombre du soleil pour indiquer les heures de la journée.',
    icon: '☀️'
  },
  {
    year: '1400',
    title: 'Horloges mécaniques',
    description: 'Apparition des premières horloges mécaniques dans les églises et tours municipales européennes.',
    icon: '⛪'
  },
  {
    year: '1510',
    title: 'Montre portable',
    description: 'Peter Henlein crée les premières montres portables, marquant le début de l\'horlogerie personnelle.',
    icon: '⌚'
  },
  {
    year: '1675',
    title: 'Spiral réglant',
    description: 'Christian Huygens invente le spiral réglant, révolutionnant la précision horlogère.',
    icon: '🔄'
  },
  {
    year: '1755',
    title: 'Échappement à ancre',
    description: 'Thomas Mudge perfectionne l\'échappement à ancre, amélioration majeure de la régulation.',
    icon: '⚙️'
  },
  {
    year: '1839',
    title: 'Patek Philippe',
    description: 'Fondation de Patek Philippe, une des manufactures horlogères les plus prestigieuses.',
    icon: '👑'
  },
  {
    year: '1868',
    title: 'Montre-bracelet',
    description: 'Patek Philippe crée la première montre-bracelet pour la Comtesse Koscowicz de Hongrie.',
    icon: '💎'
  },
  {
    year: '1905',
    title: 'Rolex',
    description: 'Hans Wilsdorf fonde Rolex, qui deviendra synonyme de luxe et de précision horlogère.',
    icon: '🏆'
  },
  {
    year: '1969',
    title: 'Quartz',
    description: 'Seiko lance la première montre à quartz, révolutionnant l\'industrie avec une précision inégalée.',
    icon: '⚡'
  },
  {
    year: '2015',
    title: 'Smartwatch',
    description: 'L\'Apple Watch popularise les montres connectées, fusionnant technologie et horlogerie.',
    icon: '📱'
  }
];

export default function TimelineHorlogerie() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 bg-clip-text text-transparent mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Histoire de l'Horlogerie
        </h2>
        <p className="text-slate-400 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
          Un voyage à travers les siècles
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Horizontal Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent transform -translate-y-1/2 hidden md:block" />

        {/* Scrollable Timeline */}
        <div className="overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-amber-600">
          <div className="flex gap-8 md:gap-16 px-4 md:px-8 min-w-max">
            {timelineData.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex-shrink-0 w-72 snap-center"
              >
                <div className="relative">
                  {/* Event Card */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border-2 transition-all duration-300 ${
                      hoveredIndex === index
                        ? 'border-amber-500 shadow-2xl shadow-amber-500/50'
                        : 'border-slate-700 shadow-lg'
                    }`}
                  >
                    {/* Glow Effect */}
                    {hoveredIndex === index && (
                      <motion.div
                        layoutId="glow"
                        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 blur-xl -z-10"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Icon */}
                    <motion.div
                      animate={{
                        rotate: hoveredIndex === index ? [0, 10, -10, 0] : 0
                      }}
                      transition={{ duration: 0.5 }}
                      className="text-5xl mb-4 text-center"
                    >
                      {event.icon}
                    </motion.div>

                    {/* Year */}
                    <h3
                      className="text-2xl font-bold text-amber-400 mb-2 text-center"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {event.year}
                    </h3>

                    {/* Title */}
                    <h4
                      className="text-xl font-semibold text-white mb-3 text-center"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {event.title}
                    </h4>

                    {/* Description - Shows on hover */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        height: hoveredIndex === index ? 'auto' : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p
                        className="text-slate-300 text-sm leading-relaxed"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {event.description}
                      </p>
                    </motion.div>

                    {/* Dot indicator */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
                      <motion.div
                        animate={{
                          scale: hoveredIndex === index ? [1, 1.5, 1] : 1,
                          boxShadow: hoveredIndex === index
                            ? '0 0 20px rgba(251, 191, 36, 0.8)'
                            : '0 0 0px rgba(251, 191, 36, 0)'
                        }}
                        transition={{ duration: 0.5 }}
                        className="w-4 h-4 rounded-full bg-amber-500 border-4 border-slate-900"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-center mt-8 text-slate-500 text-sm md:hidden"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          ← Faites défiler →
        </motion.div>
      </div>

      {/* Bottom gradient decoration */}
      <div className="mt-16 h-1 w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
    </div>
  );
}
