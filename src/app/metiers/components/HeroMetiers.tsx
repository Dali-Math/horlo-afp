'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroMetiers() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
      {/* Reflets dorés animés en arrière-plan */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E2B44F] rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E2B44F] rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-[#E2B44F] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Les Métiers de l'Horlogerie
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          Découvre les savoir-faire suisses, entre précision, passion et innovation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          <Link
            href="/metiers"
            className="inline-block px-8 py-4 bg-[#E2B44F] text-[#0a0a0a] font-semibold text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(226,180,79,0.6)] hover:scale-105"
          >
            Explorer les métiers
          </Link>
        </motion.div>
      </div>

      {/* Indicateur de scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-[#E2B44F] rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-[#E2B44F] rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
}
