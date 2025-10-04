"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CallToActionSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-amber-900/20 p-8 md:p-12 lg:p-16 shadow-2xl"
      >
        {/* Gold glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-500/10 blur-3xl" />
        
        {/* Content */}
        <div className="relative z-10 text-center space-y-6 md:space-y-8">
          {/* Invitation text */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: '"Bebas Neue", sans-serif' }}
          >
            Ne manquez aucun événement, salons ou conférence horlogère de l'année !
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto font-light"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Découvrez tous les rendez-vous incontournables de l'horlogerie de luxe et restez informé des dernières nouveautés.
          </motion.p>

          {/* Animated CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-4"
          >
            <Link href="/evenements">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(251, 191, 36, 0.6), 0 0 80px rgba(251, 191, 36, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center justify-center px-8 sm:px-12 md:px-16 py-4 md:py-5 text-lg sm:text-xl md:text-2xl font-bold text-zinc-900 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-full shadow-xl overflow-hidden transition-all duration-300"
                style={{ fontFamily: '"Bebas Neue", sans-serif' }}
              >
                {/* Animated background glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 opacity-0 group-hover:opacity-100"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ backgroundSize: "200% 100%" }}
                />
                
                {/* Button text */}
                <span className="relative z-10 tracking-wide">
                  Voir tous les événements horlogers 2025
                </span>

                {/* Arrow icon */}
                <motion.svg
                  className="relative z-10 ml-3 w-6 h-6 sm:w-7 sm:h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </motion.svg>
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-transparent rounded-br-full blur-2xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-amber-500/20 to-transparent rounded-tl-full blur-2xl" />
      </motion.div>
    </section>
  );
}
