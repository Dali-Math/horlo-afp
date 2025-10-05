"use client";

import { motion } from "framer-motion";

export default function CitationsSuisse() {
  return (
    <section className="py-20 px-6 bg-[#111]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <blockquote className="text-2xl md:text-3xl text-[#E2B44F] italic mb-6">
          "Citation inspirante sur l'horlogerie suisse"
        </blockquote>
        <p className="text-gray-400">— Auteur célèbre</p>
      </motion.div>
    </section>
  );
}
