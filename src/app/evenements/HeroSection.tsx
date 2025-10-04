"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();
  
  // Parallax effect: background moves slower than foreground
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <>
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-amber-950/40 via-gray-900 to-black overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-gray-900 to-black">
        {/* Decorative background elements with parallax - gold gradient blur */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{ y: bgY, scale: bgScale }}
        >
          <div className="absolute top-20 left-10 w-64 h-64 bg-amber-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-600 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-400 rounded-full blur-3xl"></div>
        </motion.div>

        {/* Event-themed decorative overlay pattern with parallax - subtle texture */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(217, 119, 6, 0.3) 0%, transparent 50%),
                               radial-gradient(circle at 80% 30%, rgba(180, 83, 9, 0.3) 0%, transparent 50%)`
            }}
          ></div>
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            {/* Main Title with fade-in-up animation, spacing, and glow effect */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-light-100 drop-shadow-2xl mt-10 md:mt-16"
              style={{
                fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
                textShadow: "0 0 40px rgba(217, 119, 6, 0.4), 0 0 80px rgba(217, 119, 6, 0.2)"
              }}
            >
              🗓️ Événements horlogers
            </motion.h1>

            {/* Subtitle with fade-in-up animation and improved contrast */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg sm:text-xl lg:text-2xl font-sans text-gray-300 md:text-gray-200 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}
            >
              Découvrez l'agenda des salons, ateliers gratuits et journées portes ouvertes
              pour plonger dans l'univers de l'horlogerie
            </motion.p>

            {/* Decorative divider with subtle animation */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="flex justify-center pt-4"
            >
              <div className="h-1 w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full shadow-lg shadow-amber-500/50"></div>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
      </section>

      {/* Visual separator - gold gradient between Hero and filters bar */}
      <div className="bg-gradient-to-b from-amber-500/10 to-transparent h-[2px]"></div>
    </>
  );
}
