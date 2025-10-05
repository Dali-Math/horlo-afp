"use client";

import { motion } from "framer-motion";

export default function GalerieVideosSuisse() {
  return (
    <section className="py-20 px-6 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[#E2B44F] mb-12 text-center">
          Galerie & Vidéos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#1A1A1A] aspect-video rounded-lg border border-[#E2B44F]/20">
            <p className="text-gray-400 text-center pt-20">Vidéo placeholder</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
