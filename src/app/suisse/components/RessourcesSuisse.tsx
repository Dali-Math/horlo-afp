"use client";

import { motion } from "framer-motion";

export default function RessourcesSuisse() {
  return (
    <section className="py-20 px-6 bg-[#111]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[#E2B44F] mb-12 text-center">
          Ressources Officielles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#E2B44F]/20 hover:border-[#E2B44F] transition-all duration-300">
            <h3 className="text-xl font-semibold text-[#FFD700] mb-3">Ressource 1</h3>
            <p className="text-gray-400">Lien vers ressource officielle</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
