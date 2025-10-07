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

  // On double le tableau pour que la boucle soit fluide
  const duplicated = [...partners, ...partners];

  return (
    <section className="relative py-20 bg-[#0A0A0A] overflow-hidden">
      {/* Halo */}
      <div className="absolute inset-0">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#E2B44F]/10 rounded-full blur-3xl" />
      </div>

      {/* Titre */}
      <h2 className="text-center text-4xl md:text-6xl font-bebas tracking-wider text-[#E2B44F] mb-14 drop-shadow-[0_0_25px_rgba(226,180,79,0.5)]">
        Avec le soutien des grandes maisons horlogères
      </h2>

      {/* Carrousel infini */}
      <div className="relative flex overflow-hidden whitespace-nowrap">
        <motion.div
          className="flex gap-16 px-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicated.map((partner, i) => (
            <div key={i} className="flex flex-col items-center min-w-[120px]">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={120}
                unoptimized
                className="object-contain opacity-80 hover:opacity-100 transition-all duration-500 drop-shadow-[0_0_15px_rgba(226,180,79,0.3)]"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Légende */}
      <p className="mt-12 text-center text-sm text-slate-400">
        Ressources gratuites et open-source pour la formation en horlogerie.
      </p>
    </section>
  );
}
