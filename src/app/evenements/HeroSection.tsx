"use client";
import React from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-dark-900 via-dark-800 to-black overflow-hidden">
      {/* Decorative background elements - gold gradient blur */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold-400 rounded-full blur-3xl"></div>
      </div>

      {/* Event-themed decorative overlay pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 30%, rgba(184, 134, 11, 0.3) 0%, transparent 50%)`
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          {/* Main Title with fade-in animation and glow effect */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-light-100 drop-shadow-2xl"
            style={{ 
              fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
              textShadow: "0 0 40px rgba(212, 175, 55, 0.4), 0 0 80px rgba(212, 175, 55, 0.2)"
            }}
          >
            🗓️ Événements horlogers
          </motion.h1>

          {/* Subtitle with fade-in-up animation */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl lg:text-2xl font-sans text-light-200 max-w-3xl mx-auto leading-relaxed"
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
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-gold-500 to-transparent rounded-full shadow-lg shadow-gold-500/50"></div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
}
