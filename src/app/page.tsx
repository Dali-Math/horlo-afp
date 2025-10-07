"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  { src: "/images/partners/rolex.png", alt: "Rolex" },
  { src: "/images/partners/patek.png", alt: "Patek Philippe" },
  { src: "/images/partners/audemars.png", alt: "Audemars Piguet" },
  { src: "/images/partners/vacheron.png", alt: "Vacheron Constantin" },
  { src: "/images/partners/chopard.png", alt: "Chopard" },
  { src: "/images/partners/piaget.png", alt: "Piaget" },
  { src: "/images/partners/muller.png", alt: "Franck Muller" },
];

export default function PartnersSection() {
  return (
    <section className="relative bg-[#0A0A0A] py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#0A0A0A] to-[#141414] animate-[shine_8s_linear_infinite]" />
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#E2B44F]" style={{ textShadow: "0 0 15px rgba(226,180,79,0.7)" }}>
          Avec le soutien des grandes maisons horlogères
        </h2>
      </div>
      <div className="flex items-center justify-around gap-20 px-8 relative z-10">
        {partners.map((p, i) => (
          <motion.div
            key={i}
            className="relative group flex flex-col items-center justify-center"
            initial="rest"
            whileHover="hover"
            animate="rest"
            style={{ width: 180, height: 100 }}
          >
            {/* halo noir doux animé */}
            <motion.div
              variants={{
                rest: { opacity: 0, scale: 1 },
                hover: { opacity: 0.45, scale: 3 },
              }}
              transition={{ duration: 0.27, ease: "easeInOut" }}
              className="absolute inset-0 rounded-xl bg-black pointer-events-none z-0"
            />
            {/* logo animé */}
            <motion.div
              variants={{
                rest: { scale: 1, zIndex: 1 },
                hover: { scale: 3, zIndex: 10 },   // ⬅️ Passe de 20 à 3 ici
              }}
              transition={{ duration: 0.33, ease: "easeInOut" }}
              className="relative z-10"
            >
              <Image src={p.src} alt={p.alt} width={180} height={100} className="object-contain" unoptimized />
            </motion.div>
            <span className="mt-3 text-xs text-gray-400 z-10 relative">{p.alt}</span>
          </motion.div>
        ))}
      </div>
      <p className="text-center text-gray-400 mt-10 text-sm relative z-10">
        Ressources gratuites et open-source pour la formation en horlogerie.
      </p>
      <style>{`
        @keyframes shine {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
      `}</style>
    </section>
  );
}
