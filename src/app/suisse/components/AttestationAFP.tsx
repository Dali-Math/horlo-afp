"use client";
import { motion } from "framer-motion";

export default function AttestationAFP() {
  return (
    <section className="py-20 px-6 bg-[#0a0a0a] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-[#E2B44F] mb-8"
        >
          Attestation fédérale de formation professionnelle (AFP)
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-6"
        >
          <p className="text-gray-300 text-lg leading-relaxed">
            L'AFP est une formation professionnelle suisse de deux ans, centrée sur la pratique et reconnue par la Confédération.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed">
            Elle permet d'acquérir des compétences essentielles directement en atelier et constitue une voie solide vers le Certificat fédéral de capacité (CFC).
          </p>

          <div className="pt-6">
            <motion.a
              href="https://www.orientation.ch/dyn/show/2101"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block text-[#E2B44F] hover:text-[#FFD700] transition-colors duration-300 text-lg font-medium border-b-2 border-[#E2B44F] hover:border-[#FFD700] pb-1"
            >
              En savoir plus sur orientation.ch →
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 h-[2px] bg-gradient-to-r from-transparent via-[#E2B44F] to-transparent mx-auto w-1/2"
        />
      </motion.div>
    </section>
  );
}
