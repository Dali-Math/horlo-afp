'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Clock, Crown, Sparkles, Gauge, Wrench, Watch, Gem, Trophy, Zap, Smartphone } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const timelineData: TimelineEvent[] = [
  {
    year: '3500 av. J.-C.',
    title: 'Cadrans solaires',
    description: 'Les premières méthodes de mesure du temps utilisent l\'ombre du soleil pour indiquer les heures de la journée.',
    icon: Clock
  },
  {
    year: '1400',
    title: 'Horloges mécaniques',
    description: 'Apparition des premières horloges mécaniques dans les églises et tours municipales européennes.',
    icon: Sparkles
  },
  {
    year: '1510',
    title: 'Montre portable',
    description: 'Peter Henlein crée les premières montres portables, marquant le début de l\'horlogerie personnelle.',
    icon: Watch
  },
  {
    year: '1675',
    title: 'Spiral réglant',
    description: 'Christian Huygens invente le spiral réglant, révolutionnant la précision horlogère.',
    icon: Gauge
  },
  {
    year: '1755',
    title: 'Échappement à ancre',
    description: 'Thomas Mudge perfectionne l\'échappement à ancre, amélioration majeure de la régulation.',
    icon: Wrench
  },
  {
    year: '1839',
    title: 'Patek Philippe',
    description: 'Fondation de Patek Philippe, une des manufactures horlogères les plus prestigieuses.',
    icon: Crown
  },
  {
    year: '1868',
    title: 'Montre-bracelet',
    description: 'Patek Philippe crée la première montre-bracelet pour la Comtesse Koscowicz de Hongrie.',
    icon: Gem
  },
  {
    year: '1905',
    title: 'Rolex',
    description: 'Hans Wilsdorf fonde Rolex, qui deviendra synonyme de luxe et de précision horlogère.',
    icon: Trophy
  },
  {
    year: '1969',
    title: 'Quartz',
    description: 'Seiko lance la première montre à quartz, révolutionnant l\'industrie avec une précision inégalée.',
    icon: Zap
  },
  {
    year: '2015',
    title: 'Smartwatch',
    description: 'L\'Apple Watch popularise les montres connectées, fusionnant technologie et horlogerie.',
    icon: Smartphone
  }
];

export default function TimelineHorlogerie() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress for the progress bar
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
        setScrollProgress(progress);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="w-full bg-dark-900 py-20 px-4 overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="font-bebas text-5xl md:text-6xl text-gold mb-4 animate-fade-in">
          Histoire de l'Horlogerie
        </h2>
        <p className="font-inter text-light-200 text-lg animate-fade-in-up">
          Un voyage à travers les siècles
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Horizontal Golden Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent transform -translate-y-1/2 hidden md:block pointer-events-none"></div>

        {/* Scrollable Timeline */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-thin scrollbar-track-dark-800 scrollbar-thumb-gold"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="flex gap-8 md:gap-16 px-4 md:px-8 min-w-max">
            {timelineData.map((event, index) => {
              const Icon = event.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="flex-shrink-0 w-72 snap-center"
                >
                  <div className="relative">
                    {/* Event Card */}
                    <motion.div
                      whileHover={{ scale: 1.05, y: -10 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className={`relative bg-dark-800/90 backdrop-blur rounded-2xl p-6 border-2 transition-all duration-300 ${hoveredIndex === index
                          ? 'gold-border shadow-2xl shadow-gold/30 gold-glow'
                          : 'border-white/10 shadow-lg'
                        }`}
                    >
                      {/* Golden Glow Effect on Hover */}
                      {hoveredIndex === index && (
                        <motion.div
                          layoutId="timeline-glow"
                          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/10 to-gold-light/10 blur-xl -z-10"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}

                      {/* Lucide Icon */}
                      <motion.div
                        animate={{
                          rotate: hoveredIndex === index ? [0, 10, -10, 0] : 0,
                          scale: hoveredIndex === index ? 1.1 : 1
                        }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center mb-4"
                      >
                        <div className={`p-3 rounded-full ${
                          hoveredIndex === index 
                            ? 'bg-gold/20 animate-glow' 
                            : 'bg-white/5'
                        } transition-all duration-300`}>
                          <Icon className={`w-8 h-8 ${
                            hoveredIndex === index 
                              ? 'text-gold-light' 
                              : 'text-gold'
                          } transition-colors duration-300`} />
                        </div>
                      </motion.div>

                      {/* Year - Golden Circle Badge */}
                      <div className="flex justify-center mb-4">
                        <motion.div
                          animate={{
                            scale: hoveredIndex === index ? [1, 1.1, 1] : 1,
                            boxShadow: hoveredIndex === index
                              ? '0 0 30px rgba(212, 175, 55, 0.6)'
                              : '0 0 0px rgba(212, 175, 55, 0)'
                          }}
                          transition={{ duration: 0.4 }}
                          className="w-24 h-24 rounded-full bg-gradient-to-br from-gold via-gold-light to-gold-dark flex items-center justify-center border-4 border-dark-900 shadow-lg"
                        >
                          <h3 className="font-bebas text-lg text-dark-900 text-center leading-tight">
                            {event.year}
                          </h3>
                        </motion.div>
                      </div>

                      {/* Title */}
                      <h4 className="font-oswald text-xl font-semibold text-light-100 mb-3 text-center">
                        {event.title}
                      </h4>

                      {/* Description */}
                      <motion.div
                        initial={{ opacity: 0.7, height: 'auto' }}
                        animate={{
                          opacity: hoveredIndex === index ? 1 : 0.7
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="font-inter text-light-200 text-sm leading-relaxed text-center">
                          {event.description}
                        </p>
                      </motion.div>

                      {/* Connection Dot to Timeline */}
                      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block">
                        <motion.div
                          animate={{
                            scale: hoveredIndex === index ? [1, 1.5, 1] : 1,
                            boxShadow: hoveredIndex === index
                              ? '0 0 20px rgba(212, 175, 55, 0.8)'
                              : '0 0 0px rgba(212, 175, 55, 0)'
                          }}
                          transition={{ duration: 0.5 }}
                          className="w-5 h-5 rounded-full bg-gold border-4 border-dark-900 shadow-lg animate-glow"
                        />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="mt-8 px-4 md:px-8">
          <div className="relative w-full h-2 bg-dark-800 rounded-full overflow-hidden border border-white/10">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-gold via-gold-light to-gold rounded-full shadow-lg shadow-gold/50"
              style={{ width: `${scrollProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="font-inter text-light-200/60 text-xs text-center mt-2">
            Faites défiler horizontalement pour explorer l'histoire
          </p>
        </div>
      </div>

      {/* Bottom Golden Divider */}
      <div className="mt-16 h-0.5 w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
    </div>
  );
}
