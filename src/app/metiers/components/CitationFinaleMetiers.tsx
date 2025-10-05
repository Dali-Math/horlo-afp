'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const citations = [
  {
    text: "L'excellence n'est jamais un accident, c'est une habitude.",
    author: "Aristote"
  },
  {
    text: "La précision est le silence du mouvement parfait.",
    author: "Maître horloger suisse"
  },
  {
    text: "Le temps ne s'arrête jamais, mais il peut être apprivoisé.",
    author: "Abraham-Louis Breguet"
  },
  {
    text: "Dans chaque montre réside l'âme de son créateur.",
    author: "Tradition horlogère"
  }
];

export default function CitationFinaleMetiers() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % citations.length);
    }, 9000); // Changement toutes les 9 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] overflow-hidden py-20 px-6">
      {/* Effet de halo doré discret et flou */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E2B44F] rounded-full blur-[200px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Contenu avec citations cycliques */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#E2B44F] mb-12 leading-tight">
            Vers l'excellence
          </h2>

          {/* Citations avec AnimatePresence pour transitions fluides */}
          <div className="relative min-h-[200px] md:min-h-[250px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <blockquote className="text-3xl md:text-4xl lg:text-5xl text-[#E2B44F] italic font-serif mb-6 leading-relaxed px-4">
                  <motion.span
                    className="inline-block"
                    animate={{
                      textShadow: [
                        '0 0 20px rgba(226, 180, 79, 0.4)',
                        '0 0 30px rgba(226, 180, 79, 0.6)',
                        '0 0 20px rgba(226, 180, 79, 0.4)',
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    "{citations[currentIndex].text}"
                  </motion.span>
                </blockquote>
                <p className="text-xl md:text-2xl text-[#d1d1d1] font-light">
                  — {citations[currentIndex].author}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicateurs de pagination */}
          <motion.div
            className="flex justify-center gap-3 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {citations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? 'bg-[#E2B44F] w-8 shadow-lg shadow-[#E2B44F]/50'
                    : 'bg-[#4a4a4a] hover:bg-[#6a6a6a]'
                }`}
                aria-label={`Citation ${index + 1}`}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
