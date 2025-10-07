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

      {/* Logos */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-10 place-items-center">
        {partners.map((partner, i) => (
          <motion.div
            key={partner.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="relative group flex flex-col items-center justify-center text-center"
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={140}
              height={140}
              priority={i === 0}
              unoptimized // utile si CDN pose problème sur les assets statiques
              className="object-contain opacity-90 group-hover:opacity-100 transition duration-500 drop-shadow-[0_0_12px_rgba(226,180,79,0.25)]"
              onError={(e) => {
                e.currentTarget.src = "/logos/fallback.png"; // mets un fallback si tu ajoutes ce fichier
              }}
            />
            <span className="mt-3 text-xs text-gray-400">{partner.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Légende */}
      <p className="mt-12 text-center text-sm text-slate-400">
        Ressources gratuites et open-source pour la formation en horlogerie.
      </p>
    </section>
  );
}
