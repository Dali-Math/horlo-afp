"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const partners = [
  { src: "/images/partners/rolex.jpg", alt: "Rolex" },
  { src: "/images/partners/patek.png", alt: "Patek Philippe" },
  { src: "/images/partners/audemars.png", alt: "Audemars Piguet" },
  { src: "/images/partners/vacheron.png", alt: "Vacheron Constantin" },
  { src: "/images/partners/chopard.png", alt: "Chopard" },
  { src: "/images/partners/piaget.jpg", alt: "Piaget" },
  { src: "/images/partners/muller.png", alt: "Franck Muller" },
];

export default function PartnersSection() {
  return (
    <section className="relative bg-[#0A0A0A] py-16 overflow-hidden">
      <div className="text-center mb-10">
        <h2
          className="text-3xl md:text-4xl font-semibold text-[#E2B44F] tracking-wide mb-6"
          style={{ textShadow: "0 0 12px rgba(226,180,79,0.6)" }}
        >
          Avec le soutien des grandes maisons horlogères
        </h2>
      </div>

      {/* Bande dorée animée */}
      <motion.div
        className="flex items-center justify-around gap-16 px-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
      >
        {[...partners, ...partners].map((p, i) => (
          <motion.div
            key={i}
            className="grayscale hover:grayscale-0 transition-all duration-500"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={160}
              height={100}
              className="object-contain opacity-80 hover:opacity-100 transition-all"
            />
          </motion.div>
        ))}
      </motion.div>

      <p className="text-center text-gray-400 mt-10 text-sm">
        Ressources gratuites et open-source pour la formation en horlogerie.
      </p>
    </section>
  );
}
