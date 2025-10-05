'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CitationFinaleMetiers() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0a0a] via-[#1a1209] to-[#0a0a0a] overflow-hidden py-20 px-6">
      {/* Effet de lumière dorée diffuse */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E2B44F] rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-[#E2B44F] mb-8 leading-tight">
            Vers l'excellence
          </h2>

          <motion.blockquote
            className="text-2xl md:text-3xl text-[#d1d1d1] italic mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            "La précision est le silence du mouvement parfait."
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Link
              href="/formation-cfc"
              className="inline-block px-8 py-4 bg-[#E2B44F] text-[#0a0a0a] font-bold text-lg rounded-lg hover:bg-[#d4a73e] transition-all duration-300 shadow-lg hover:shadow-[#E2B44F]/50 hover:scale-105"
            >
              Découvrir les formations CFC
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
