"use client";
import { motion } from "framer-motion";

export default function AttestationAFP() {
  return (
    <section className="py-20 px-6 bg-[#0a0a0a]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[#E2B44F] mb-8">
          Attestation fédérale de formation professionnelle (AFP)
        </h2>
        
        <div className="space-y-6">
          <p className="text-gray-300 text-lg leading-relaxed">
            L'AFP est une formation professionnelle suisse de deux ans, centrée sur la pratique et reconnue par la Confédération.
          </p>
          
          <p className="text-gray-300 text-lg leading-relaxed">
            Elle permet d'acquérir des compétences essentielles directement en atelier et constitue une voie solide vers le Certificat fédéral de capacité (CFC).
          </p>
          
          <div className="pt-6">
            <a
              href="https://www.orientation.ch/dyn/show/2101?utm_source=chatgpt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[#E2B44F] hover:text-[#FFD700] transition-colors duration-300 text-lg font-medium border-b-2 border-[#E2B44F] hover:border-[#FFD700] pb-1"
            >
              En savoir plus sur orientation.ch →
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
