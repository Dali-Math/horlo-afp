"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const citations = [
  {
    text: "Le temps ne se mesure pas, il se façonne avec passion et précision.",
    author: "Abraham-Louis Breguet"
  },
  {
    text: "L'horlogerie suisse n'est pas un métier, c'est un art transmis de génération en génération.",
    author: "Patek Philippe"
  },
  {
    text: "Chaque montre raconte une histoire, chaque mécanisme est une symphonie de perfection.",
    author: "Hans Wilsdorf"
  }
];

export default function CitationsSuisse() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % citations.length);
    }, 8000); // Change citation every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 md:py-32 px-6 bg-black overflow-hidden">
      {/* Particules dorées décoratives (optionnel) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#E2B44F] rounded-full opacity-30"
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-[#E2B44F] rounded-full opacity-20"
          animate={{
            y: [20, -20, 20],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Container des citations */}
      <div className="max-w-5xl mx-auto text-center relative">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <blockquote className="relative">
            <p 
              className="text-2xl md:text-4xl lg:text-5xl text-[#E2B44F] font-serif italic mb-8 leading-relaxed"
              style={{
                textShadow: '0 0 20px rgba(226, 180, 79, 0.4), 0 0 40px rgba(226, 180, 79, 0.2)',
                fontFamily: 'Georgia, "Times New Roman", serif'
              }}
            >
              "{citations[currentIndex].text}"
            </p>
            <footer>
              <motion.p 
                className="text-lg md:text-xl text-[#E2B44F]/70 font-light tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                — {citations[currentIndex].author}
              </motion.p>
            </footer>
          </blockquote>
        </motion.div>

        {/* Indicateurs de pagination */}
        <div className="flex justify-center gap-3 mt-12">
          {citations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                index === currentIndex 
                  ? 'bg-[#E2B44F] w-8 shadow-[0_0_10px_rgba(226,180,79,0.6)]' 
                  : 'bg-[#E2B44F]/30 hover:bg-[#E2B44F]/50'
              }`}
              aria-label={`Citation ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Ligne décorative premium */}
      <motion.div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#E2B44F] to-transparent"
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </section>
  );
}
