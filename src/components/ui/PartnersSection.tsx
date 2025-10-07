"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PartnersSection() {
  const partners = [
    { name: "Rolex", logo: "/images/partners/rolex.png" },
    { name: "Patek Philippe", logo: "/images/partners/patek.png" },
    { name: "Audemars Piguet", logo: "/images/partners/audemars.png" },
    { name: "Vacheron Constantin", logo: "/images/partners/vacheron.png" },
    { name: "Piaget", logo: "/images/partners/piaget.png" },
    { name: "Chopard", logo: "/images/partners/chopard.png" },
    { name: "Franck Muller", logo: "/images/partners/muller.png" },
  ];

  return (
    <section className="relative py-32 bg-[#0A0A0A] overflow-hidden flex flex-col items-center justify-center">
      {/* Halo central doré */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[700px] h-[700px] bg-[#E2B44F]/10 rounded-full blur-[120px]" />
      </div>

      {/* Titre au centre */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-4xl md:text-6xl font-bebas tracking-wide text-[#E2B44F] mb-14 drop-shadow-[0_0_25px_rgba(226,180,79,0.4)] z-10"
      >
        Avec le soutien des grandes maisons horlogères
      </motion.h2>

      {/* Cercle de logos tournants */}
      <div className="relative w-[500px] h-[500px] flex items-center justify-center">
        <div className="absolute w-full h-full animate-rotate-slow">
          {partners.map((partner, i) => {
            const angle = (i / partners.length) * 2 * Math.PI;
            const x = Math.cos(angle) * 200; // rayon horizontal
            const y = Math.sin(angle) * 200; // rayon vertical
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={90}
                  height={90}
                  unoptimized
                  className="object-contain opacity-90 hover:opacity-100 transition duration-500 drop-shadow-[0_0_12px_rgba(226,180,79,0.25)]"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Légende */}
      <p className="mt-12 text-center text-sm text-slate-400 z-10">
        Ressources gratuites et open-source pour la formation en horlogerie.
      </p>

      {/* Animation rotation */}
      <style jsx global>{`
        @keyframes rotate-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-rotate-slow {
          animation: rotate-slow 40s linear infinite;
          transform-origin: center center;
        }
      `}</style>
    </section>
  );
}
