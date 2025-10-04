'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface Museum {
  name: string;
  description: string;
  link: string;
  icon: string;
}

const museums: Museum[] = [
  {
    name: 'MIH – Musée International d\'Horlogerie',
    description: 'La Chaux-de-Fonds. Collection exceptionnelle retraçant 500 ans d\'histoire horlogère.',
    link: 'https://www.chaux-de-fonds.ch/musees/mih',
    icon: '🏛️'
  },
  {
    name: 'Patek Philippe Museum',
    description: 'Genève. Prestigieuse collection de montres et automates du XVIe siècle à nos jours.',
    link: 'https://www.patekmuseum.com',
    icon: '🕰️'
  },
  {
    name: 'Musée du Locle – Château des Monts',
    description: 'Le Locle. Cadre historique magnifique dédié à l\'horlogerie neuchâteloise.',
    link: 'https://www.chateaudesmonts.ch',
    icon: '🏛️'
  },
  {
    name: 'Musée des Arts et Métiers',
    description: 'Paris. Vaste collection technique incluant horloges, pendules et instruments de mesure du temps.',
    link: 'https://www.arts-et-metiers.net',
    icon: '🕰️'
  }
];

export default function MuseumsSection() {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-dark-950 to-dark-970">
      <div className="max-w-7xl mx-auto">
        {/* Animated Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl md:text-6xl font-bebas text-center mb-16 text-gold-400"
          style={{
            textShadow: '0 0 30px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.2)'
          }}
        >
          🏛️ Musées horlogers
        </motion.h2>

        {/* Museums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {museums.map((museum, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative bg-dark-800/60 backdrop-blur-sm rounded-xl p-6 border border-gold-500/20 hover:border-gold-500/50 transition-all duration-300"
              style={{
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%)'
                }}
              />

              {/* Icon */}
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {museum.icon}
              </div>

              {/* Museum Name */}
              <h3 className="text-2xl font-bebas text-gold-400 mb-3 group-hover:text-gold-300 transition-colors duration-300"
                style={{
                  textShadow: '0 0 20px rgba(212, 175, 55, 0.0)'
                }}
              >
                <span className="group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all duration-300">
                  {museum.name}
                </span>
              </h3>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed mb-4 font-inter">
                {museum.description}
              </p>

              {/* Link */}
              <a
                href={museum.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 font-inter font-medium transition-colors duration-300"
              >
                Visiter le site
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
