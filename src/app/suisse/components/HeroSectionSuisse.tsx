"use client";

import { motion } from "framer-motion";

export default function HeroSectionSuisse() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-6 z-10"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-[#E2B44F]">L'Horlogerie Suisse</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Excellence, tradition et savoir-faire d'exception
        </p>
      </motion.div>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#111] to-[#1A1A1A] opacity-90" />
    </section>
  );
}
