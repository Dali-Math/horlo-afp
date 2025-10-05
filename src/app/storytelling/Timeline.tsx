"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Timeline Component
 * Animated timeline showing horological history
 * Gold/black theme with scroll-triggered animations
 */

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "1600",
    title: "Naissance de l'horlogerie suisse",
    description: "Les premiers horlogers s'établissent à Genève",
    icon: "⚙️",
  },
  {
    year: "1755",
    title: "Fondation Vacheron Constantin",
    description: "La plus ancienne manufacture encore active",
    icon: "🏛️",
  },
  {
    year: "1875",
    title: "Ère de la haute précision",
    description: "Développement des complications horlogères",
    icon: "🔬",
  },
  {
    year: "1970",
    title: "Crise du quartz",
    description: "L'industrie suisse fait face à la révolution électronique",
    icon: "⚡",
  },
  {
    year: "2025",
    title: "Renaissance de la mécanique",
    description: "Retour à l'excellence artisanale et l'innovation",
    icon: "✨",
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-black py-20 px-4 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-yellow-900/10 via-black to-black" />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
          Histoire de l'Horlogerie
        </h2>
        <p className="text-xl text-gray-400">Un voyage à travers les siècles</p>
      </motion.div>

      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400/20 via-yellow-500/40 to-yellow-400/20" />

      {/* Timeline events */}
      <div className="relative max-w-6xl mx-auto">
        {timelineEvents.map((event, index) => {
          const isLeft = index % 2 === 0;
          
          return (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex items-center mb-20 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
            >
              {/* Content */}
              <div className={`w-5/12 ${isLeft ? "text-right pr-8" : "text-left pl-8"}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-zinc-900 to-black border border-yellow-500/30 rounded-lg p-6 shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300"
                >
                  <div className="text-4xl mb-2">{event.icon}</div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">{event.year}</h3>
                  <h4 className="text-xl font-semibold text-white mb-2">{event.title}</h4>
                  <p className="text-gray-400">{event.description}</p>
                </motion.div>
              </div>

              {/* Center dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
                className="relative z-10 w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full border-4 border-black shadow-lg shadow-yellow-500/50"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                  className="absolute inset-0 bg-yellow-400 rounded-full"
                />
              </motion.div>

              {/* Spacer */}
              <div className="w-5/12" />
            </motion.div>
          );
        })}
      </div>

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full border-4 border-yellow-400 flex items-center justify-center"
        style={{
          rotate: useTransform(scrollYProgress, [0, 1], [0, 360]),
        }}
      >
        <div className="text-yellow-400 font-bold text-sm">
          {Math.round(scrollYProgress.get() * 100)}%
        </div>
      </motion.div>
    </section>
  );
}
