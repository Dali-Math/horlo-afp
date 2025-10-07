"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PartnersSection() {
  const partners = [
    { name: "Rolex", logo: "/logos/rolex.png" },
    { name: "Patek Philippe", logo: "/logos/patek.png" },
    { name: "Audemars Piguet", logo: "/logos/audemars.png" },
    { name: "Vacheron Constantin", logo: "/logos/vacheron.png" },
    { name: "Piaget", logo: "/logos/piaget.png" },
    { name: "Chopard", logo: "/logos/chopard.png" },
    { name: "Franck Muller", logo: "/logos/muller.png" },
  ];

  return (
    <section className="relative py-20 bg-[#0A0A0A] overflow-hidden">
      {/* Halo décoratif */}
      <div className="absolute inset-0">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#E2B44F]/10 rounded-full blur-3xl" />
      </div>

      {/* Titre */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-4xl md:text-6xl font-bebas tracking-wider text-[#E2B44F] mb-14 drop-shadow-[0_0_25px_rgba(226,180,79,0.5)]"
      >
        Maisons horlogères genevoises
      </motion.h2>

      {/* Grille logos */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 place-items-center">
        {partners.map((partner, i) => (
          <motion.div
            key={partner.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="relative group flex items-center justify-center"
          >
            <div className="relative w-[160px] sm:w-[180px] md:w-[200px] h-[100px] sm:h-[120px] md:h-[140px] flex items-center justify-center">
              {/* Effet lumineux doré */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E2B44F]/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine rounded-lg" />
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 200px"
                className="object-contain opacity-80 group-hover:opacity-100 transition duration-500"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shine {
          animation: shine 1.6s linear;
        }
      `}</style>
    </section>
  );
}
