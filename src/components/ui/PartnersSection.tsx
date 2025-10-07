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
    <section className="relative py-20 bg-[#0A0A0A] overflow-hidden">
      {/* Halo central doré */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[700px] h-[700px] bg-[#E2B44F]/10 rounded-full blur-[120px]" />
      </div>

      {/* Titre */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-4xl md:text-6xl font-bebas tracking-wide text-[#E2B44F] mb-14 drop-shadow-[0_0_25px_rgba(226,180,79,0.4)]"
      >
        Avec le soutien des grandes maisons horlogères
      </motion.h2>

      {/* Carrousel horizontal infini */}
      <div className="relative overflow-hidden max-w-7xl mx-auto">
        <div className="flex animate-scroll gap-16 justify-center items-center">
          {[...partners, ...partners].map((partner, i) => (
            <div
              key={i}
              className="relative w-[140px] h-[140px] flex items-center justify-center shrink-0 group"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={140}
                height={140}
                unoptimized
                priority={i === 0}
                className="object-contain opacity-90 group-hover:opacity-100 transition duration-500 drop-shadow-[0_0_12px_rgba(226,180,79,0.25)]"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/images/partners/fallback.png";
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Légende */}
      <p className="mt-12 text-center text-sm text-slate-400">
        Ressources gratuites et open-source pour la formation en horlogerie.
      </p>

      {/* Animation CSS */}
      <style jsx global>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
}
