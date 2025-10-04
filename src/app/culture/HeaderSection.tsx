"use client";

import React from "react";
import { motion } from "framer-motion";

interface NavButton {
  label: string;
  href: string;
}

const navButtons: NavButton[] = [
  { label: "Histoire", href: "#histoire" },
  { label: "Musées", href: "#musees" },
  { label: "Vidéos", href: "#videos" },
  { label: "Ligne du temps", href: "#timeline" },
];

export default function HeaderSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-dark-900 via-dark-800 to-black overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-600 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          {/* Main Title with fade-in animation */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-light-100"
            style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
          >
            Culture horlogère
          </motion.h1>

          {/* Subtitle with fade-in-up animation */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl lg:text-2xl font-sans text-light-200 max-w-3xl mx-auto"
          >
            Un voyage à travers les arts et métiers du temps
          </motion.p>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-4 pt-8"
          >
            {navButtons.map((button, index) => (
              <motion.a
                key={button.label}
                href={button.href}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(212, 175, 55, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-dark-800/60 border border-gold-500/30 text-gold-500 font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-dark-700/60 hover:border-gold-400/50 hover:text-gold-400 hover:shadow-lg hover:shadow-gold-500/20"
              >
                {button.label}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
}
