"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PartnersSection() {
  const partners = [
    { src: "/images/partners/rolex.png", alt: "Rolex" },
    { src: "/images/partners/patek.png", alt: "Patek Philippe" },
    { src: "/images/partners/audemars.png", alt: "Audemars Piguet" },
    { src: "/images/partners/vacheron.png", alt: "Vacheron Constantin" },
    { src: "/images/partners/chopard.png", alt: "Chopard" },
    { src: "/images/partners/piaget.png", alt: "Piaget" },
    { src: "/images/partners/muller.png", alt: "Franck Muller" },
  ];

  return (
    <section className="relative bg-[#0A0A0A] py-20 overflow-hidden">
      {/* Halo global */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[900px] h-[900px] bg-[#E2B44F]/10 rounded-full blur-[160px]" />
      </div>

      {/* Titre */}
      <div className="text-center mb-14 relative z-10">
        <h2
          className="text-3xl md:text-4xl font-semibold text-[#E2B44F]"
          style={{ textShadow: "0 0 15px rgba(226,180,79,0.7)" }}
        >
          Avec le soutien des grandes maisons horlogères
        </h2>
      </div>

      {/* Logos en mouvement */}
      <motion.div
        className="flex items-center justify-around gap-20 px-8 relative z-20"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {[...partners, ...partners].map((p, i) => (
          <motion.div
            key={i}
            className="relative group flex items-center justify-center transition-all duration-[1200ms]"
          >
            {/* Fond assombri local */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/80 transition-all duration-700 rounded-full blur-3xl scale-150 z-[1]" />

            {/* Logo */}
            <div className="relative z-[2]">
              <Image
                src={p.src}
                alt={p.alt}
                width={180}
                height={100}
                className="object-contain opacity-85 transition-transform duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[30] group-hover:opacity-100 drop-shadow-[0_0_80px_rgba(226,180,79,1)]"
              />
              {/* Halo doré individuel */}
              <div className="absolute inset-0 rounded-full bg-[#E2B44F]/40 blur-3xl opacity-0 group-hover:opacity-80 transition-all duration-700" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <p className="text-center text-gray-400 mt-10 text-sm relative z-10">
        Ressources gratuites et open-source pour la formation en horlogerie.
      </p>
    </section>
  );
}
