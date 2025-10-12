"use client";
import { motion } from "framer-motion";

export default function HeroSectionSuisse() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      
      {/* Swiss Flag Banner Video */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 mx-auto w-[700px] h-[180px] border-2 border-[#d10032] rounded-lg overflow-hidden shadow-lg bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-lg"
          width={700}
          height={180}
        >
          <source src="/videos/swiss-flag-banner.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
      </div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#1a1a1a]" />

      {/* Animated hero content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Gold animated title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 tracking-wide"
        >
          <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4E5B8] to-[#D4AF37] bg-clip-text text-transparent">
            L'Horlogerie Suisse
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light mb-12 leading-relaxed"
        >
          Excellence, tradition et savoir-faire d'exception
        </motion.p>

        {/* Gold fade-in button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button className="group relative px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-black font-semibold text-base md:text-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105">
            <span className="relative z-10">Découvrir l'Excellence</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#F4E5B8] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>
      </motion.div>

      {/* Decorative golden particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute top-20 left-10 w-2 h-2 bg-[#D4AF37] rounded-full blur-sm"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, delay: 1.3 }}
          className="absolute bottom-32 right-20 w-3 h-3 bg-[#D4AF37] rounded-full blur-sm"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, delay: 1.6 }}
          className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-[#F4E5B8] rounded-full blur-sm"
        />
      </div>
    </section>
  );
}
