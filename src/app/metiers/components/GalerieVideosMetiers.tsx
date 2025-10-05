'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function GalerieVideosMetiers() {
  return (
    <section className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-[#E2B44F] text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Galerie & Vidéos
        </motion.h2>

        <motion.p
          className="text-lg text-[#d1d1d1] text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Découvrez le quotidien des apprentis en images et en vidéo.
        </motion.p>

        {/* Grille 3x2 pour images et vidéos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Placeholder items - à remplacer avec vraies images/vidéos */}
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <motion.div
              key={index}
              className="relative aspect-video bg-[#1A1A1A] rounded-lg overflow-hidden border-2 border-[#E2B44F]/20 hover:border-[#E2B44F] transition-all duration-300 hover:shadow-lg hover:shadow-[#E2B44F]/30"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Placeholder pour image/vidéo */}
              <div className="w-full h-full flex items-center justify-center text-[#E2B44F] font-semibold">
                {index < 4 ? `Image ${item}` : `Vidéo ${item - 4}`}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-sm text-[#d1d1d1] italic">
            Images et vidéos à intégrer : ateliers, gestes techniques, outils, et pièces horlogères
          </p>
        </motion.div>
      </div>
    </section>
  );
}
