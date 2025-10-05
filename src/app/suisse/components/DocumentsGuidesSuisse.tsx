"use client";

import { motion } from "framer-motion";

export default function DocumentsGuidesSuisse() {
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
          Documents & Guides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* PDF Card Placeholder */}
          <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#E2B44F]/20 hover:border-[#E2B44F] transition-all duration-300">
            <h3 className="text-xl font-semibold text-[#FFD700] mb-4">Guide 1</h3>
            <p className="text-gray-400 mb-4">Description du guide PDF</p>
            <button className="px-4 py-2 bg-[#E2B44F] text-black rounded hover:bg-[#FFD700] transition-colors">
              Consulter
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
